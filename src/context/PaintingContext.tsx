import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import axios from "axios";
import type { Painting } from "../types";

const apiUrl = import.meta.env.VITE_APP_STRAPI_URL;

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
		const cached = sessionStorage.getItem("paintings");
		if (cached) {
			setPaintings(JSON.parse(cached));
			setLoading(false);
			return;
		}

		axios
			.get(`${apiUrl}/api/paintings?populate=*`)
			.then((res) => {
				const data = res.data.data;
				setPaintings(data);
				sessionStorage.setItem("paintings", JSON.stringify(data));
				setLoading(false);
			})
			.catch(() => setLoading(false));
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
