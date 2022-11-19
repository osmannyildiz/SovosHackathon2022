import * as path from "path";
import { envOrDefault } from "./utils.js";

export const channelName = envOrDefault("CHANNEL_NAME", "mychannel");

export const chaincodeName = envOrDefault("CHAINCODE_NAME", "team8_chaincode");

// Path to crypto materials.
const cryptoPath = envOrDefault(
	"CRYPTO_PATH",
	path.resolve(
		process.cwd(),
		"..",
		"fabric-samples",
		"test-network",
		"organizations",
		"peerOrganizations",
		"org1.example.com"
	)
);

// Path to user private key directory.
export const keyDirectoryPath = envOrDefault(
	"KEY_DIRECTORY_PATH",
	path.resolve(cryptoPath, "users", "User1@org1.example.com", "msp", "keystore")
);

// Path to user certificate.
export const certPath = envOrDefault(
	"CERT_PATH",
	path.resolve(
		cryptoPath,
		"users",
		"User1@org1.example.com",
		"msp",
		"signcerts",
		"cert.pem"
	)
);

// Path to peer tls certificate.
export const tlsCertPath = envOrDefault(
	"TLS_CERT_PATH",
	path.resolve(cryptoPath, "peers", "peer0.org1.example.com", "tls", "ca.crt")
);

// Gateway peer endpoint.
export const peerEndpoint = envOrDefault("PEER_ENDPOINT", "localhost:7051");

// Gateway peer SSL host name override.
export const peerHostAlias = envOrDefault(
	"PEER_HOST_ALIAS",
	"peer0.org1.example.com"
);
