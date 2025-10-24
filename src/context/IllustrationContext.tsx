import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import axios from "axios";
import type { Illustration } from "../types";

const apiUrl = import.meta.env.VITE_APP_STRAPI_URL;

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
		const cached = sessionStorage.getItem("illustrations");
		if (cached) {
			setIllustrations(JSON.parse(cached));
			setLoading(false);
			return;
		}

		axios
			.get(`${apiUrl}/api/illustrations?populate=*`)
			.then((res) => {
				const data = res.data.data;
				setIllustrations(data);
				sessionStorage.setItem("illustrations", JSON.stringify(data));
				setLoading(false);
			})
			.catch(() => setLoading(false));
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
