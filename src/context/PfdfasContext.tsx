import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import axios from "axios";
import type { Portfolio } from "../types";

const apiUrl = import.meta.env.VITE_APP_STRAPI_URL;

interface PortfolioContextType {
	portfolio: Portfolio[];
	loading: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
	undefined
);

export function PortfolioProvider({ children }: { children: ReactNode }) {
	const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const cached = sessionStorage.getItem("portfolio");
		if (cached) {
			setPortfolio(JSON.parse(cached));
			setLoading(false);
			return;
		}

		axios
			.get(`${apiUrl}/api/portfolios?populate=*`)
			.then((res) => {
				const data = res.data.data;
				setPortfolio(data);
				sessionStorage.setItem("portfolio", JSON.stringify(data));
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	return (
		<PortfolioContext.Provider value={{ portfolio, loading }}>
			{children}
		</PortfolioContext.Provider>
	);
}

export function usePortfolio() {
	const context = useContext(PortfolioContext);
	if (!context)
		throw new Error("usePortfolio must be used within PortfolioProvider");
	return context;
}
