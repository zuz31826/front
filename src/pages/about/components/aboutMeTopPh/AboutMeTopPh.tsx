import polaroid from "../../../../assets/images/polaroid.png";
import about from "../../../../assets/images/about.png";
import "./aboutMeTopPh.css";

const AboutMeTopPh: React.FC = () => {
	return (
		<div className="aboutMeTopPhContainer">
			<img src={polaroid} alt="Polaroid" className="aboutMeTopPhPolaroid" />
			<img src={about} alt="About Me" className="aboutMeTopPhAbout" />
		</div>
	);
};

export default AboutMeTopPh;
