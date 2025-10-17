import VideoBg from "./components/videoBg/VideoBg";
import Introducing from "./components/introducing/Introducing";
import Inspiration from "./components/inspiration/Inspiration";

const HomeScreen: React.FC = () => {
	return (
		<div>
			<VideoBg />
			<Introducing />
			<Inspiration />
		</div>
	);
};

export default HomeScreen;
