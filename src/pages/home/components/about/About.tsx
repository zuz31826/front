import Button from "../../../../components/button/Button";
import "./about.css";

const About: React.FC = () => {
	return (
		<div className="aboutContainer">
			<div className="aboutButtonContainer">
				<Button text="Paintings" />
				<Button text="Tattoos" />
				<Button text="Illustrations" />
			</div>
			<p className="aboutText">
				Click here to find out more about my background
			</p>
			<Button text="About me" />
		</div>
	);
};

export default About;
