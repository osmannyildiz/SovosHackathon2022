import "./Invoice.css";

export default function Invoice(props) {
	return (
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">Invoice {props.invoice.id}</h5>
				<p className="card-text">
					<ul className="list-group list-group-flush">
						<li className="list-group-item">
							Payable Amount: {props.invoice.payableAmount}{" "}
							{props.invoice.currencyId}
						</li>
						<li className="list-group-item">
							Supplier Party: {props.invoice.accountingSupplierParty}
						</li>
						<li className="list-group-item">
							Customer Party: {props.invoice.accountingCustomerParty}
						</li>
					</ul>
				</p>
			</div>
			<div className="card-footer">
				<small className="text-muted">
					Issue Date: {props.invoice.issueDate}
				</small>
				<button type="button" className="btn btn-primary btn-sm" id="small-btn">
					Download
				</button>
			</div>
		</div>
	);
}
