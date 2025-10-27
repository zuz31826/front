import { Link } from "react-router-dom";
import VisualArtHeaderText from "./components/headerText/VisualArtHeaderText";
import VisualArtVideoBg from "./components/videoBg/VisualArtVideoBg";
import VisualArtFooter from "./components/footerButtons/VisualArtFooter";
import "./visualArtScreen.css";

const VisualArtScreen = () => {
	return (
		<div className="visualArtScreenContainer">
			<VisualArtHeaderText />
			<VisualArtVideoBg />
			<Link
				to="https://www.instagram.com/wruszkatutuasz"
				target="_blank"
				rel="noopener noreferrer"
			>
				<p className="visualArtScreenLink">@wruszkatutuasz</p>
			</Link>
			<VisualArtFooter />
		</div>
	);
};

export default VisualArtScreen;
