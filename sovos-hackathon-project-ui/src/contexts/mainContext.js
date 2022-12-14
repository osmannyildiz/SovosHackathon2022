import { useState } from "react";
import buildContext from "../utils/buildContext";

export const [MainContext, useMainContext] = buildContext();

export function buildMainContextValue() {
	const [currentPage, setCurrentPage] = useState("login");

	return {
		currentPage,
		setCurrentPage,
	};
}
