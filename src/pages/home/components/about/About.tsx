import ButtonImg from "../../../../components/buttonImg/ButtonImg";
import tattoo from "../../../../assets/images/tattoo.png";
import illustration from "../../../../assets/images/illustration.png";
import painting from "../../../../assets/images/painting.png";
import about from "../../../../assets/images/about.png";
import "./about.css";

const About: React.FC = () => {
	return (
		<div className="aboutContainer">
			<div className="aboutButtonContainer">
				<ButtonImg
					image={painting}
					alt="Painting"
					onClick={() => console.log("Painting clicked")}
				/>
				<ButtonImg
					image={tattoo}
					alt="Tattoo"
					onClick={() => console.log("Tattoo clicked")}
				/>
				<ButtonImg
					image={illustration}
					alt="Illustration"
					onClick={() => console.log("Illustration clicked")}
				/>
			</div>

			<p className="aboutText">
				Click here to find out more about my background
			</p>

			<ButtonImg
				image={about}
				alt="About"
				onClick={() => console.log("about clicked")}
				big
			/>
		</div>
	);
};

export default About;
