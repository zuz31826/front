import "./aboutMeText.css";

type Props = {
	text: string;
	mb?: boolean;
};

const AboutMeText: React.FC<Props> = ({ text, mb }) => {
	return (
		<div className="aboutMeTextContainer">
			<p className={`aboutMeText ${mb ? "mb" : ""}`}>{text}</p>
		</div>
	);
};

export default AboutMeText;
