import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import HomeScreen from "./pages/home/HomeScreen";
import Header from "./components/header/Header";
import "./styles/app.css";

const AppRoutes: React.FC = () => {
	return (
		<div className="container">
			{<Header />}
			<main className="main">
				<Routes>
					<Route path="/" element={<HomeScreen />} />

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
			<Analytics />
			<AppRoutes />
		</BrowserRouter>
	);
}

export default App;
