import { useNavigate } from "react-router-dom";
import ButtonImg from "../../../../components/buttonImg/ButtonImg";
import "./visualArtFooter.css";
import painting from "../../../../assets/images/painting.png";
import illustration from "../../../../assets/images/illustration.png";

const VisualArtFooter: React.FC = () => {
	const navigation = useNavigate();

	return (
		<div className="visualArtFooterContainer">
			<ButtonImg
				image={painting}
				alt="Painting"
				onClick={() => navigation("/painting")}
			/>
			<ButtonImg
				image={illustration}
				alt="Illustration"
				onClick={() => navigation("/illustration")}
			/>
			<ButtonImg
				image={painting}
				alt="Tattoo"
				onClick={() => navigation("/sketch")}
			/>
		</div>
	);
};

export default VisualArtFooter;
