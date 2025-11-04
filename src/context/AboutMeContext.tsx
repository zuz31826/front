import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { fetchAboutMeApi } from "../api";
import type { AboutMe } from "../types";

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
			const data = await fetchAboutMeApi();
			setAboutMe(data);
		} catch (err: any) {
			setError(err.message);
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
