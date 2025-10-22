import HomeVideoBg from "./components/videoBg/HomeVideoBg";
import Introducing from "./components/introducing/Introducing";
import Inspiration from "./components/inspiration/Inspiration";
import Collaboration from "./components/collaboration/Collaboration";
import About from "./components/about/About";

const HomeScreen: React.FC = () => {
	return (
		<div>
			<HomeVideoBg />
			<Introducing />
			<Inspiration />
			<Collaboration />
			<About />
		</div>
	);
};

export default HomeScreen;
