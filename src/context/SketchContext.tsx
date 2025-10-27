import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import axios from "axios";
import type { Sketches } from "../types";

const apiUrl = import.meta.env.VITE_APP_STRAPI_URL;

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
		const cached = sessionStorage.getItem("sketches");
		if (cached) {
			setSketches(JSON.parse(cached));
			setLoading(false);
			return;
		}

		axios
			.get(`${apiUrl}/api/sketchbooks?populate=*`)
			.then((res) => {
				const data = res.data.data;
				setSketches(data);
				sessionStorage.setItem("sketches", JSON.stringify(data));
				setLoading(false);
			})
			.catch(() => setLoading(false));
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
