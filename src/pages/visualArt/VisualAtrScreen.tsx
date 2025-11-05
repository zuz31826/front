// import { Link } from "react-router-dom";
import VisualArtHeaderText from "./components/visualArtHeaderText/VisualArtHeaderText";
import VisualArtVideoBg from "./components/visualArtVideoBg/VisualArtVideoBg";
import InstaLinkLight from "../../components/instaLinkLight/InstaLinkLight";
// import TextInfo from "../../components/textInfo/TextInfo";
import "./visualArtScreen.css";

const VisualArtScreen = () => {
	return (
		<div className="visualArtContainer">
			<VisualArtHeaderText />
			<VisualArtVideoBg />
			{/* <Link
				to="https://www.instagram.com/wruszkatutuasz"
				target="_blank"
				rel="noopener noreferrer"
			>
				<TextInfo text="@wruszkatutuasz" className="visualArtLink" />
			</Link> */}
			<InstaLinkLight containerClassName="visualArtLinkContainer visualArtLink" />
		</div>
	);
};

export default VisualArtScreen;
