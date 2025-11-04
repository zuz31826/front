import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { fetchPaintingsApi } from "../api";
import type { Painting } from "../types";

interface PaintingContextType {
	paintings: Painting[];
	loading: boolean;
}

const PaintingContext = createContext<PaintingContextType | undefined>(
	undefined
);

export function PaintingProvider({ children }: { children: ReactNode }) {
	const [paintings, setPaintings] = useState<Painting[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			try {
				const data = await fetchPaintingsApi();
				setPaintings(data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	return (
		<PaintingContext.Provider value={{ paintings, loading }}>
			{children}
		</PaintingContext.Provider>
	);
}

export function usePaintings() {
	const context = useContext(PaintingContext);
	if (!context)
		throw new Error("usePaintings must be used within PaintingProvider");
	return context;
}
