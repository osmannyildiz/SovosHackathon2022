import { connect } from "@hyperledger/fabric-gateway";
import { chaincodeName, channelName } from "./constants.js";
import {
	newGrpcConnection,
	newIdentity,
	newSigner,
	utf8Decoder,
} from "./utils.js";

export class ContractModel {
	_client = null;
	_gateway = null;
	_network = null;
	_contract = null;

	constructor() {}

	async _init() {
		this._client = await newGrpcConnection();
		this._gateway = connect({
			client: this._client,
			identity: await newIdentity(),
			signer: await newSigner(),
			// Default timeouts for different gRPC calls
			evaluateOptions: () => {
				return { deadline: Date.now() + 5000 }; // 5 seconds
			},
			endorseOptions: () => {
				return { deadline: Date.now() + 15000 }; // 15 seconds
			},
			submitOptions: () => {
				return { deadline: Date.now() + 5000 }; // 5 seconds
			},
			commitStatusOptions: () => {
				return { deadline: Date.now() + 60000 }; // 1 minute
			},
		});
		this._network = this._gateway.getNetwork(channelName);
		this._contract = this._network.getContract(chaincodeName);
	}

	_destruct() {
		this._gateway.close();
		this._client.close();
	}

	async invoke(methodName, ...args) {
		console.log(`--> Invoke: ${methodName}`);

		const respBytes = await this._contract.evaluateTransaction(
			methodName,
			...args
		);
		const respJson = utf8Decoder.decode(respBytes);
		const resp = JSON.parse(respJson);

		console.log("*** Invoked successfully");

		return resp.result;
	}
}
