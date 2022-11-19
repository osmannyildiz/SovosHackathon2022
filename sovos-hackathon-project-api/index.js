import express from "express";
import fileUpload from "express-fileupload";
import { ContractModel } from "./contractModel.js";
import { parseInvoiceFromXmlFile } from "./utils.js";

const app = express();
app.use(express.json());
app.use(fileUpload());

app.get("/", (req, res) => {
	return res.json({ message: "Team 8 API is online." });
});

app.get("/hello", async (req, res) => {
	const contractModel = new ContractModel();
	await contractModel._init();

	const result = await contractModel.invoke("hello");

	contractModel._destruct();
	return res.json({ result });
});

app.get("/invoices", async (req, res) => {
	const contractModel = new ContractModel();
	await contractModel._init();

	const result = await contractModel.invoke("getAllInvoices");

	contractModel._destruct();
	return res.json({ result });
});

app.get("/invoices/:id", async (req, res) => {
	const { id } = req.params;

	const contractModel = new ContractModel();
	await contractModel._init();

	const result = await contractModel.invoke("getInvoiceById", id);

	contractModel._destruct();
	return res.json({ result });
});

app.post("/invoices", async (req, res) => {
	const { xmlFile } = req.files;
	if (!xmlFile) {
		return res.json({ error: "No invoice XML file in request." });
	}
	const invoice = await parseInvoiceFromXmlFile(xmlFile);
	const invoiceJson = JSON.stringify(invoice);

	const contractModel = new ContractModel();
	await contractModel._init();

	const result = await contractModel.invoke("addInvoice", invoiceJson);

	contractModel._destruct();
	return res.json({ result });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on :${PORT}`));
