import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { fetchPortfolioApi } from "../api";
import type { Portfolio } from "../types";

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
		const load = async () => {
			try {
				const data = await fetchPortfolioApi();
				setPortfolio(data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		load();
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
