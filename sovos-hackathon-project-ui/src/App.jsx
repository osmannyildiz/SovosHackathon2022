import "./App.css";
import { useMainContext } from "./contexts/mainContext";
import DashboardPage from "./pages/DashboardPage";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
	const mainCtx = useMainContext();

	let page;
	switch (mainCtx.currentPage) {
		case "login":
			page = <LoginPage />;
			break;
		case "dashboard":
			page = <DashboardPage />;
			break;
		case "invoices":
			page = <InvoicesPage />;
			break;
	}

	return <div className="app">{page}</div>;
}
