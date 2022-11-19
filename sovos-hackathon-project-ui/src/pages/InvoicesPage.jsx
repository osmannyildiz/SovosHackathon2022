import { useEffect, useState } from "react";
import Invoice from "../components/Invoice";
import MainLayout from "../layouts/MainLayout";
import { HttpClient } from "../utils/httpClient";
import "./InvoicesPage.css";

// const INVOICES = [
// 	{
// 		id: "SVS2022000000001",
// 		issueDate: "2022-11-08",
// 		payableAmount: "5900",
// 		currencyId: "TRY",
// 		accountingSupplierParty: "TEST MÜKELLEFİ 1",
// 		accountingCustomerParty: "TEST MÜKELLEFİ 1",
// 		xmlFileHash:
// 			"208d6ddb37e6dbad49c97f4231327fab8c90800bdf000a3889e957bfc0cf067e",
// 	},
// 	{
// 		id: "SVS2022000000002",
// 		issueDate: "2022-05-03",
// 		payableAmount: "7850",
// 		currencyId: "TRY",
// 		accountingSupplierParty: "TEST MÜKELLEFİ 2",
// 		accountingCustomerParty: "TEST MÜKELLEFİ 2",
// 		xmlFileHash:
// 			"4564564db37e6dbad49c97f4231327fab8c9080bdf000a3889e957bfc0cf5646",
// 	},
// 	{
// 		id: "SVS2022000000003",
// 		issueDate: "2022-12-23",
// 		payableAmount: "5130",
// 		currencyId: "TRY",
// 		accountingSupplierParty: "TEST MÜKELLEFİ 3",
// 		accountingCustomerParty: "TEST MÜKELLEFİ 3",
// 		xmlFileHash:
// 			"4645464537e6dbad49c97f4231327fab8c90800bdf000a3889e5464884897987",
// 	},
// 	{
// 		id: "SVS2022000000001",
// 		issueDate: "2022-11-08",
// 		payableAmount: "5900",
// 		currencyId: "TRY",
// 		accountingSupplierParty: "TEST MÜKELLEFİ 1",
// 		accountingCustomerParty: "TEST MÜKELLEFİ 1",
// 		xmlFileHash:
// 			"208d6ddb37e6dbad49c97f4231327fab8c90800bdf000a3889e957bfc0cf067e",
// 	},
// 	{
// 		id: "SVS2022000000002",
// 		issueDate: "2022-05-03",
// 		payableAmount: "7850",
// 		currencyId: "TRY",
// 		accountingSupplierParty: "TEST MÜKELLEFİ 2",
// 		accountingCustomerParty: "TEST MÜKELLEFİ 2",
// 		xmlFileHash:
// 			"4564564db37e6dbad49c97f4231327fab8c9080bdf000a3889e957bfc0cf5646",
// 	},
// 	{
// 		id: "SVS2022000000003",
// 		issueDate: "2022-12-23",
// 		payableAmount: "5130",
// 		currencyId: "TRY",
// 		accountingSupplierParty: "TEST MÜKELLEFİ 3",
// 		accountingCustomerParty: "TEST MÜKELLEFİ 3",
// 		xmlFileHash:
// 			"4645464537e6dbad49c97f4231327fab8c90800bdf000a3889e5464884897987",
// 	},
// ];

export default function InvoicesPage() {
	const [invoices, setInvoices] = useState([]);

	useEffect(() => {
		(async () => {
			const resp = await HttpClient.get("http://localhost:5000/invoices");
			setInvoices(resp.result);
		})();
	}, []);

	return (
		<MainLayout>
			<section className="header">
				<h2>Invoices</h2>
				<hr />
			</section>
			<section className="card-list">
				{invoices.map((invoice) => (
					<Invoice key={invoice.id} invoice={invoice} />
				))}
			</section>
		</MainLayout>
	);
}
