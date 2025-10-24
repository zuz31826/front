import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import {
	IllustrationProvider,
	useIllustrations,
} from "./context/IllustrationContext";
import { PortfolioProvider, usePortfolio } from "./context/portfolioContext";

import HomeScreen from "./pages/home/HomeScreen";
import IllustrationScreen from "./pages/illustration/IllustrationScreen";
import TattooScreen from "./pages/tattoo/TattooScreen";
import BookingScreen from "./pages/booking/BookingScreen";
import PortfolioScreen from "./pages/portfolio/PortfolioScreen";

import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/header/Header";
import "./styles/app.css";

const AppRoutes: React.FC = () => {
	useIllustrations();
	usePortfolio();

	return (
		<div className="container">
			<ScrollToTop />
			<Header />
			<main className="main">
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/illustration" element={<IllustrationScreen />} />
					<Route path="/tattoo" element={<TattooScreen />} />
					<Route path="/booking" element={<BookingScreen />} />
					<Route path="/portfolio" element={<PortfolioScreen />} />

					{/* <Route path="*" element={<Navigate to="/404" replace />} />
					<Route path="/404" element={<Error404 />} /> */}
				</Routes>
			</main>
		</div>
	);
};

function App() {
	return (
		<BrowserRouter>
			<IllustrationProvider>
				<PortfolioProvider>
					<Analytics />
					<AppRoutes />
				</PortfolioProvider>
			</IllustrationProvider>
		</BrowserRouter>
	);
}

export default App;
