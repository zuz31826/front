import TextInfo from "../textInfo/TextInfo";
import inst from "../../assets/images/inst.png";
import "./instaLinkLight.css";

type Props = {
	containerClassName?: string;
};

const InstaLinkLight: React.FC<Props> = ({ containerClassName }) => {
	return (
		<div className={`instaLinkLightContainer ${containerClassName}`}>
			<img src={inst} alt="Instagram" className="instaLinkLightImage" />
			<a
				href="https://www.instagram.com/wruszkatutuasz"
				target="_blank"
				rel="noopener noreferrer"
			>
				<TextInfo text="wruszkatutuasz" className="instaLinkLightText" />
			</a>
		</div>
	);
};

export default InstaLinkLight;
