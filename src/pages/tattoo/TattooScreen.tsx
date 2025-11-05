// import { Link } from "react-router-dom";
import TattooHeaderText from "./components/tattooHeaderText/TattooHeaderText";
import TattooVideoBg from "./components/tattooVideoBg/TattooVideoBg";
// import TextInfo from "../../components/textInfo/TextInfo";
import InstaLinkLight from "../../components/instaLinkLight/InstaLinkLight";
import "./tattooScreen.css";

const TattooScreen: React.FC = () => {
	return (
		<div className="tattooContainer">
			<TattooHeaderText />
			<TattooVideoBg />
			{/* <Link
				to="https://www.instagram.com/wruszkatutuasz"
				target="_blank"
				rel="noopener noreferrer"
			>
				<TextInfo text="@wruszkatutuasz" className="tattooLink" />
			</Link> */}
			<InstaLinkLight containerClassName="tattooLinkContainer tattooLink" />
		</div>
	);
};

export default TattooScreen;
