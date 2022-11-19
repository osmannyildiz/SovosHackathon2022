import * as grpc from "@grpc/grpc-js";
import { signers } from "@hyperledger/fabric-gateway";
import * as crypto from "crypto";
import { promises as fs } from "fs";
import * as path from "path";
import * as process from "process";
import { TextDecoder } from "util";
import xml2js from "xml2js";
import {
	certPath,
	keyDirectoryPath,
	peerEndpoint,
	peerHostAlias,
	tlsCertPath,
} from "./constants.js";

export const utf8Decoder = new TextDecoder();

export function envOrDefault(key, defaultValue) {
	return process.env[key] || defaultValue;
}

export async function newGrpcConnection() {
	const tlsRootCert = await fs.readFile(tlsCertPath);
	const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
	return new grpc.Client(peerEndpoint, tlsCredentials, {
		"grpc.ssl_target_name_override": peerHostAlias,
	});
}

export async function newIdentity() {
	const mspId = envOrDefault("MSP_ID", "Org1MSP");
	const credentials = await fs.readFile(certPath);
	return { mspId, credentials };
}

export async function newSigner() {
	const files = await fs.readdir(keyDirectoryPath);
	const keyPath = path.resolve(keyDirectoryPath, files[0]);
	const privateKeyPem = await fs.readFile(keyPath);
	const privateKey = crypto.createPrivateKey(privateKeyPem);
	return signers.newPrivateKeySigner(privateKey);
}

function calculateSha256Hash(data) {
	const hash = crypto.createHash("sha256");
	hash.update(data);
	const hex = hash.digest("hex");
	return hex;
}

async function xmlFileToJsObject(xmlFile) {
	const xmlString = xmlFile.data.toString();
	const parsedObj = await xml2js.parseStringPromise(xmlString);
	return { xmlString, parsedObj };
}

export async function parseInvoiceFromXmlFile(xmlFile) {
	const { xmlString, parsedObj } = await xmlFileToJsObject(xmlFile);
	const invoice = {
		id: parsedObj["Invoice"]["cbc:ID"][0],
		issueDate: parsedObj["Invoice"]["cbc:IssueDate"][0],
		payableAmount:
			parsedObj["Invoice"]["cac:LegalMonetaryTotal"][0]["cbc:PayableAmount"][0][
				"_"
			],
		currencyId:
			parsedObj["Invoice"]["cac:LegalMonetaryTotal"][0]["cbc:PayableAmount"][0][
				"$"
			]["currencyID"],
		accountingSupplierParty:
			parsedObj["Invoice"]["cac:AccountingSupplierParty"][0]["cac:Party"][0][
				"cac:PartyName"
			][0]["cbc:Name"][0],
		accountingCustomerParty:
			parsedObj["Invoice"]["cac:AccountingCustomerParty"][0]["cac:Party"][0][
				"cac:PartyName"
			][0]["cbc:Name"][0],
		xmlFileHash: calculateSha256Hash(xmlString),
	};
	return invoice;
}
