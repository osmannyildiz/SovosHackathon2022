#!/bin/bash

##### CONFIGURATION

export TEAM8_TEST_NETWORK_PATH=${PWD}/fabric-samples/test-network
export TEAM8_CHAINCODE_PATH=${PWD}/sovos-hackathon-project-chaincode


##### DEFINITIONS

func__switch_to_peer1() {
	export CORE_PEER_LOCALMSPID="Org1MSP"
	export CORE_PEER_TLS_ROOTCERT_FILE=${TEAM8_TEST_NETWORK_PATH}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
	export CORE_PEER_MSPCONFIGPATH=${TEAM8_TEST_NETWORK_PATH}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
	export CORE_PEER_ADDRESS=localhost:7051
}

func__switch_to_peer2() {
	export CORE_PEER_LOCALMSPID="Org2MSP"
	export CORE_PEER_TLS_ROOTCERT_FILE=${TEAM8_TEST_NETWORK_PATH}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
	export CORE_PEER_MSPCONFIGPATH=${TEAM8_TEST_NETWORK_PATH}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
	export CORE_PEER_ADDRESS=localhost:9051
}

func__install_to_current_peer() {
	peer lifecycle chaincode install team8_chaincode.tar.gz
}

func__approve_for_current_org() {
	peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name team8_chaincode --version 1.0 --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile "${TEAM8_TEST_NETWORK_PATH}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"
}

func__get_confirmation() {
	read -p "$1 (y/n) " ANSWER
	if [ "$ANSWER" = "y" ]; then
		echo "You answered: Yes"
		return 0
	else
		echo "You answered: No"
		return 1
	fi
}

export CORE_PEER_TLS_ENABLED=true


##### ACTION

func__get_confirmation "Please restart the network (if you didn't), then just press Enter."
echo

peer lifecycle chaincode package team8_chaincode.tar.gz --path $TEAM8_CHAINCODE_PATH --lang node --label team8_chaincode_1.0

func__switch_to_peer1
func__install_to_current_peer
func__get_confirmation "Did it install?"
while [ $? == 1 ]
do
	func__install_to_current_peer
	func__get_confirmation "Did it install?"
done
echo

func__switch_to_peer2
func__install_to_current_peer
func__get_confirmation "Did it install?"
while [ $? == 1 ]
do
	func__install_to_current_peer
	func__get_confirmation "Did it install?"
done
echo

peer lifecycle chaincode queryinstalled
func__get_confirmation "Looks good?"
if [ $? = 1 ]; then exit 1; fi
echo

echo -n "Please copy and paste your package id here: "
read PACKAGE_ID
export CC_PACKAGE_ID="$PACKAGE_ID"
echo

func__approve_for_current_org

func__switch_to_peer1
func__approve_for_current_org

peer lifecycle chaincode checkcommitreadiness --channelID mychannel --name team8_chaincode --version 1.0 --sequence 1 --tls --cafile "${TEAM8_TEST_NETWORK_PATH}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" --output json
func__get_confirmation "Looks good?"
if [ $? = 1 ]; then exit 1; fi
echo

peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name team8_chaincode --version 1.0 --sequence 1 --tls --cafile "${TEAM8_TEST_NETWORK_PATH}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" --peerAddresses localhost:7051 --tlsRootCertFiles "${TEAM8_TEST_NETWORK_PATH}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${TEAM8_TEST_NETWORK_PATH}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt"

peer lifecycle chaincode querycommitted --channelID mychannel --name team8_chaincode --cafile "${TEAM8_TEST_NETWORK_PATH}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"
func__get_confirmation "Looks good?"
if [ $? = 1 ]; then exit 1; fi
echo

func__get_confirmation "Deployment complete. Would you like to call the contract's hello function to test it?"
if [ $? = 1 ]; then exit 1; fi
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${TEAM8_TEST_NETWORK_PATH}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n team8_chaincode --peerAddresses localhost:7051 --tlsRootCertFiles "${TEAM8_TEST_NETWORK_PATH}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${TEAM8_TEST_NETWORK_PATH}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"hello","Args":[]}'
echo

echo "Done. Good job!"
