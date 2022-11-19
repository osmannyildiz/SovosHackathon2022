const { Contract } = require("fabric-contract-api");
const stringify = require("json-stringify-deterministic");
const sortKeysRecursive = require("sort-keys-recursive");

const INVOICES = [
	{
		id: "SVS2022000000001",
		issueDate: "2022-11-08",
		payableAmount: "5900",
		currencyId: "TRY",
		accountingSupplierParty: "TEST MÜKELLEFİ 1",
		accountingCustomerParty: "TEST MÜKELLEFİ 1",
		xmlFileHash:
			"208d6ddb37e6dbad49c97f4231327fab8c90800bdf000a3889e957bfc0cf067e",
	},
	{
		id: "SVS2022000000002",
		issueDate: "2022-05-03",
		payableAmount: "7850",
		currencyId: "TRY",
		accountingSupplierParty: "TEST MÜKELLEFİ 2",
		accountingCustomerParty: "TEST MÜKELLEFİ 2",
		xmlFileHash:
			"4564564db37e6dbad49c97f4231327fab8c9080bdf000a3889e957bfc0cf5646",
	},
	{
		id: "SVS2022000000003",
		issueDate: "2022-12-23",
		payableAmount: "5130",
		currencyId: "TRY",
		accountingSupplierParty: "TEST MÜKELLEFİ 3",
		accountingCustomerParty: "TEST MÜKELLEFİ 3",
		xmlFileHash:
			"4645464537e6dbad49c97f4231327fab8c90800bdf000a3889e5464884897987",
	},
];

const responseWithResult = (result) =>
	JSON.stringify({
		result,
	});

class MainContract extends Contract {
	async hello(ctx) {
		return responseWithResult({
			ok: true,
			message: "Hello from Hyperledgeeeer!!! (^-^)",
		});
	}

	async invoiceWithIdExists(ctx, invoiceId) {
		// const result = await ctx.stub.getState(invoiceId);
		// return result && result.length > 0;
		return responseWithResult(
			INVOICES.filter((i) => i.id === invoiceId).length > 0
		);
	}

	async getAllInvoices(ctx) {
		// const allResults = [];
		// // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
		// const iterator = await ctx.stub.getStateByRange('', '');
		// let result = await iterator.next();
		// while (!result.done) {
		// 		const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
		// 		let record;
		// 		try {
		// 				record = JSON.parse(strValue);
		// 		} catch (err) {
		// 				console.log(err);
		// 				record = strValue;
		// 		}
		// 		allResults.push(record);
		// 		result = await iterator.next();
		// }
		// return JSON.stringify(allResults);
		return responseWithResult(INVOICES);
	}

	async getInvoiceById(ctx, invoiceId) {
		// const assetJSON = await ctx.stub.getState(invoiceId); // get the asset from chaincode state
		// if (!assetJSON || assetJSON.length === 0) {
		// 		throw new Error(`The asset ${invoiceId} does not exist`);
		// }
		// return assetJSON.toString();
		const invoice = INVOICES.find((i) => i.id === invoiceId);
		if (!invoice) {
			return responseWithResult(null);
		}
		return responseWithResult(invoice);
	}

	async addInvoice(ctx, newInvoiceJson) {
		const newInvoice = JSON.parse(newInvoiceJson);
		const existsResp = await this.invoiceWithIdExists(ctx, newInvoice.id);
		if (existsResp.result) {
			throw new Error(`The invoice with id ${newInvoice.id} already exists.`);
		}

		// const asset = {
		// 	ID: id,
		// 	Color: color,
		// 	Size: size,
		// 	Owner: owner,
		// 	AppraisedValue: appraisedValue,
		// };
		// await ctx.stub.putState(
		// 	id,
		// 	Buffer.from(stringify(sortKeysRecursive(asset)))
		// );
		// return JSON.stringify(asset);
		INVOICES.push(newInvoice);
		return responseWithResult(newInvoice);
	}
}

module.exports = MainContract;
