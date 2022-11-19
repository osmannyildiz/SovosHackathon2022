import "./App.css";
import { useMainContext } from "./contexts/mainContext";
import DashboardPage from "./pages/DashboardPage";
import InvoicesPage from "./pages/InvoicesPage";

export default function App() {
	const mainCtx = useMainContext();

	let page;
	switch (mainCtx.currentPage) {
		case "dashboard":
			page = <DashboardPage />;
			break;
		case "invoices":
			page = <InvoicesPage />;
			break;
	}

	return <div className="app">{page}</div>;
}
