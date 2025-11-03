import { Link } from "react-router-dom";
import TattooHeaderText from "./components/headerText/TattooHeaderText";
import TattooVideoBg from "./components/videoBg/TattooVideoBg";
import TextInfo from "../../components/textInfo/TextInfo";
import "./tattooScreen.css";

const TattooScreen: React.FC = () => {
	return (
		<div className="tattooScreenContainer">
			<TattooHeaderText />
			<TattooVideoBg />
			<Link
				to="https://www.instagram.com/wruszkatutuasz"
				target="_blank"
				rel="noopener noreferrer"
			>
				<TextInfo text="@wruszkatutuasz" className="tattooScreenLink" />
			</Link>
		</div>
	);
};

export default TattooScreen;
