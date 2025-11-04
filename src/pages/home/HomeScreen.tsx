import HomeVideoBg from "./components/homeVideoBg/HomeVideoBg";
import HomeIntroducing from "./components/homeIntroducing/HomeIntroducing";
import HomeInspiration from "./components/homeInspiration/HomeInspiration";
import HomeCollaboration from "./components/homeCollaboration/HomeCollaboration";
import HomeAbout from "./components/homeAbout/HomeAbout";

const HomeScreen: React.FC = () => {
	return (
		<div>
			<HomeVideoBg />
			<HomeIntroducing />
			<HomeInspiration />
			<HomeCollaboration />
			<HomeAbout />
		</div>
	);
};

export default HomeScreen;
