import { buildMainContextValue, MainContext } from "../contexts/mainContext";

export default function ContextsProvider(props) {
	const mainContextValue = buildMainContextValue();

	return (
		<MainContext.Provider value={mainContextValue}>
			{props.children}
		</MainContext.Provider>
	);
}
