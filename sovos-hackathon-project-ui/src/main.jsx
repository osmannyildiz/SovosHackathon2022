import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ContextsProvider from "./components/ContextsProvider";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<ContextsProvider>
		<App />
	</ContextsProvider>
);
