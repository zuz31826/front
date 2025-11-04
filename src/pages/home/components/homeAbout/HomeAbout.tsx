import { useNavigate } from "react-router-dom";
import TextInfo from "../../../../components/textInfo/TextInfo";
import ButtonImg from "../../../../components/buttonImg/ButtonImg";
import illustration from "../../../../assets/images/illustrationButt.png";
import painting from "../../../../assets/images/paintingButt.png";
import tattoo from "../../../../assets/images/tattooButt.png";
import about from "../../../../assets/images/aboutButt.png";
import "./homeAbout.css";

const About: React.FC = () => {
	const navigation = useNavigate();

	return (
		<div className="homeAboutContainer">
			<div className="homeAboutButtonContainer">
				<ButtonImg
					image={painting}
					alt="Painting"
					onClick={() => navigation("/painting")}
				/>
				<ButtonImg
					image={tattoo}
					alt="Tattoo"
					onClick={() => navigation("/tattoo")}
				/>
				<ButtonImg
					image={illustration}
					alt="Illustration"
					onClick={() => navigation("/illustration")}
				/>
			</div>

			<TextInfo
				text={"Click here to find out more about my background"}
				className="homeAboutText"
			/>

			<ButtonImg
				image={about}
				alt="About"
				onClick={() => navigation("/about")}
				big
			/>
		</div>
	);
};

export default About;
