import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import {
	IllustrationProvider,
	useIllustrations,
} from "./context/IllustrationContext";
import { PaintingProvider } from "./context/PaintingContext";
import { PortfolioProvider, usePortfolio } from "./context/portfolioContext";

import HomeScreen from "./pages/home/HomeScreen";
import IllustrationScreen from "./pages/illustration/IllustrationScreen";
import TattooScreen from "./pages/tattoo/TattooScreen";
import BookingScreen from "./pages/booking/BookingScreen";
import PortfolioScreen from "./pages/portfolio/PortfolioScreen";
import PaintingScreen from "./pages/painting/PaintingScreen";
import AdminPage from "./pages/admin/AdminPage";

import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/header/Header";
import "./styles/app.css";

const AppRoutes: React.FC = () => {
	useIllustrations();
	usePortfolio();

	const location = useLocation();
	const hideHeader = location.pathname !== "/admin";

	return (
		<div className="container">
			<ScrollToTop />
			{hideHeader && <Header />}
			<main className="main">
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/illustration" element={<IllustrationScreen />} />
					<Route path="/tattoo" element={<TattooScreen />} />
					<Route path="/booking" element={<BookingScreen />} />
					<Route path="/portfolio" element={<PortfolioScreen />} />
					<Route path="/admin" element={<AdminPage />} />
					<Route path="/painting" element={<PaintingScreen />} />

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
			<PaintingProvider>
				<IllustrationProvider>
					<PortfolioProvider>
						<Analytics />
						<AppRoutes />
					</PortfolioProvider>
				</IllustrationProvider>
			</PaintingProvider>
		</BrowserRouter>
	);
}

export default App;
