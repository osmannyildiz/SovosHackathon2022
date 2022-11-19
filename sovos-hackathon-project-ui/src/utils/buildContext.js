import { createContext, useContext } from "react";

export default function buildContext() {
	const builtContext = createContext(null);

	const builtUseContext = () => {
		const contextInstance = useContext(builtContext);
		if (contextInstance === null) {
			throw new Error(
				"You can use this hook only inside the context's provider."
			);
		}
		return contextInstance;
	};

	return [builtContext, builtUseContext];
}
