import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { fetchSketchesApi } from "../api";
import type { Sketches } from "../types";

interface SketchesContextType {
	sketches: Sketches[];
	loading: boolean;
}

const SketchesContext = createContext<SketchesContextType | undefined>(
	undefined
);

export function SketchesProvider({ children }: { children: ReactNode }) {
	const [sketches, setSketches] = useState<Sketches[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			try {
				const data = await fetchSketchesApi();
				setSketches(data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	return (
		<SketchesContext.Provider value={{ sketches, loading }}>
			{children}
		</SketchesContext.Provider>
	);
}

export function useSketches() {
	const context = useContext(SketchesContext);
	if (!context)
		throw new Error("useSketches must be used within SketchesProvider");
	return context;
}
