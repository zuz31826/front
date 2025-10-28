import photo from "../../../../assets/images/zuzPh.png";
import introducing from "../../../../assets/images/introducing.png";
import "./introducing.css";

const Introducing: React.FC = () => {
	return (
		<div className="introducingContainer">
			<div className="introducingTextContainer">
				<p className="introducingMainText">Who am I?</p>
				<p className="introducingMainText">I’m Wruszka</p>
				<img
					src={introducing}
					alt="here should be a Portrait"
					className="introducingIllustration"
				/>
			</div>

			<img src={photo} alt="Zuz" className="introducingPhoto" />
		</div>
	);
};

export default Introducing;
