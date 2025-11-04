import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { fetchIllustrationsApi } from "../api";
import type { Illustration } from "../types";

interface IllustrationContextType {
	illustrations: Illustration[];
	loading: boolean;
}

const IllustrationContext = createContext<IllustrationContextType | undefined>(
	undefined
);

export function IllustrationProvider({ children }: { children: ReactNode }) {
	const [illustrations, setIllustrations] = useState<Illustration[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			try {
				const data = await fetchIllustrationsApi();
				setIllustrations(data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	return (
		<IllustrationContext.Provider value={{ illustrations, loading }}>
			{children}
		</IllustrationContext.Provider>
	);
}

export function useIllustrations() {
	const context = useContext(IllustrationContext);
	if (!context)
		throw new Error(
			"useIllustrations must be used within IllustrationProvider"
		);
	return context;
}
