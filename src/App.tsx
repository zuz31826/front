import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { PortfolioProvider, usePortfolio } from "./context/PortfolioContext";
import { PaintingProvider, usePaintings } from "./context/PaintingContext";
import {
	IllustrationProvider,
	useIllustrations,
} from "./context/IllustrationContext";
import { SketchesProvider, useSketches } from "./context/SketchContext";

import HomeScreen from "./pages/home/HomeScreen";
import TattooScreen from "./pages/tattoo/TattooScreen";
import BookingScreen from "./pages/booking/BookingScreen";
import PortfolioScreen from "./pages/portfolio/PortfolioScreen";
import VisualArtScreen from "./pages/visualArt/VisualAtrScreen";
import PaintingScreen from "./pages/painting/PaintingScreen";
import IllustrationScreen from "./pages/illustration/IllustrationScreen";
import SketchScreen from "./pages/sketch/SketchScreen";
import AdminPage from "./pages/admin/AdminPage";

import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/header/Header";
import "./styles/app.css";

const AppRoutes: React.FC = () => {
	useIllustrations();
	usePaintings();
	usePortfolio();
	useSketches();

	const location = useLocation();
	const hideHeader = location.pathname !== "/admin";

	return (
		<div className="container">
			<ScrollToTop />
			{hideHeader && <Header />}
			<main className="main">
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/tattoo" element={<TattooScreen />} />
					<Route path="/booking" element={<BookingScreen />} />
					<Route path="/portfolio" element={<PortfolioScreen />} />
					<Route path="/visual-art" element={<VisualArtScreen />} />
					<Route path="/painting" element={<PaintingScreen />} />
					<Route path="/illustration" element={<IllustrationScreen />} />
					<Route path="/sketch" element={<SketchScreen />} />

					<Route path="/admin" element={<AdminPage />} />
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
			<PortfolioProvider>
				<PaintingProvider>
					<IllustrationProvider>
						<SketchesProvider>
							<Analytics />
							<AppRoutes />
						</SketchesProvider>
					</IllustrationProvider>
				</PaintingProvider>
			</PortfolioProvider>
		</BrowserRouter>
	);
}

export default App;
