import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeVideoBg from "./components/homeVideoBg/HomeVideoBg";
import HomeIntroducing from "./components/homeIntroducing/HomeIntroducing";
import HomeInspiration from "./components/homeInspiration/HomeInspiration";
import HomeCollaboration from "./components/homeCollaboration/HomeCollaboration";
import HomeAbout from "./components/homeAbout/HomeAbout";

const HomeScreen: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.state?.scrollTo) {
			const el = document.getElementById(location.state.scrollTo);
			if (el) {
				setTimeout(() => {
					el.scrollIntoView({ behavior: "smooth" });

					navigate(location.pathname, { replace: true, state: {} });
				}, 100);
			}
		}
	}, [location, navigate]);

	return (
		<div>
			<HomeVideoBg />
			<HomeIntroducing />
			<HomeInspiration />
			<section id="collaboration">
				<HomeCollaboration />
			</section>
			<HomeAbout />
		</div>
	);
};

export default HomeScreen;
