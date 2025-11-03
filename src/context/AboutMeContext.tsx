import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import axios from "axios";
import type { AboutMe } from "../types";

const apiUrl = import.meta.env.VITE_APP_STRAPI_URL;

interface AboutMeContextType {
	aboutMe: AboutMe[];
	loading: boolean;
	error: string | null;
	retry: () => void;
}

const AboutMeContext = createContext<AboutMeContextType | undefined>(undefined);

export function AboutMeProvider({ children }: { children: ReactNode }) {
	const [aboutMe, setAboutMe] = useState<AboutMe[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchAboutMe = async () => {
		setLoading(true);
		setError(null);

		try {
			const cached = sessionStorage.getItem("aboutMe");
			if (cached) {
				setAboutMe(JSON.parse(cached));
				setLoading(false);
				return;
			}

			const res = await axios.get(`${apiUrl}/api/abouts?populate=*`);
			const data = res.data.data;

			setAboutMe(data);
			sessionStorage.setItem("aboutMe", JSON.stringify(data));
		} catch (err) {
			console.error("❌ Error fetching AboutMe data:", err);
			setError("Failed to load content. Please try again later.");
			setAboutMe([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAboutMe();
	}, []);

	return (
		<AboutMeContext.Provider
			value={{ aboutMe, loading, error, retry: fetchAboutMe }}
		>
			{children}
		</AboutMeContext.Provider>
	);
}

export function useAboutMe() {
	const context = useContext(AboutMeContext);
	if (!context)
		throw new Error("useAboutMe must be used within AboutMeProvider");
	return context;
}
