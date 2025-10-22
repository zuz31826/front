import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import {
	IllustrationProvider,
	useIllustrations,
} from "./context/IllustrationContext";
import HomeScreen from "./pages/home/HomeScreen";
import IllustrationScreen from "./pages/illustration/IllustrationScreen";
import TattooScreen from "./pages/tattoo/TattooScreen";
import Header from "./components/header/Header";
import "./styles/app.css";

const AppRoutes: React.FC = () => {
	useIllustrations();

	return (
		<div className="container">
			{<Header />}
			<main className="main">
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/illustration" element={<IllustrationScreen />} />
					<Route path="/tattoo" element={<TattooScreen />} />

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
				<Analytics />
				<AppRoutes />
			</IllustrationProvider>
		</BrowserRouter>
	);
}

export default App;
