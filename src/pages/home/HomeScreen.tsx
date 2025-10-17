import VideoBg from "./components/videoBg/VideoBg";
import Introducing from "./components/introducing/Introducing";
import Inspiration from "./components/inspiration/Inspiration";
import Collaboration from "./components/collaboration/Collaboration";
import About from "./components/about/About";

const HomeScreen: React.FC = () => {
	return (
		<div>
			<VideoBg />
			<Introducing />
			<Inspiration />
			<Collaboration />
			<About />
		</div>
	);
};

export default HomeScreen;
