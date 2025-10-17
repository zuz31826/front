import photo from "../../../../assets/images/zuzPh.png";
import bg from "../../../../assets/images/introducingBg.png";

import "./introducing.css";

const Introducing: React.FC = () => {
	return (
		<div className="introducingContainer">
			<div className="introducingTextContainer">
				<p className="introducingMainText">Who am I?</p>
				<p className="introducingMainText">I’m Wruszka</p>

				<div className="introducingSubTextContainer">
					<img src={bg} alt="bg" className="introducingSubTextBg" />
					<p className="introducingSubText">
						My name is Zuzik. <br /> I am a visual artist from Poland. <br /> I
						do freehand tattoos full-time, but I’m interested in all forms of
						visual creation.
					</p>
				</div>
			</div>

			<img src={photo} alt="Zuz" className="introducingPhoto" />
		</div>
	);
};

export default Introducing;
