import { Link } from "react-router-dom";
import VisualArtHeaderText from "./components/headerText/VisualArtHeaderText";
import VisualArtVideoBg from "./components/videoBg/VisualArtVideoBg";
import TextInfo from "../../components/textInfo/TextInfo";
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
				<TextInfo text="@wruszkatutuasz" className="visualArtScreenLink" />
			</Link>
		</div>
	);
};

export default VisualArtScreen;
