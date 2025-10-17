import dragon from "../../../../assets/images/dragon.png";
import "./inspiration.css";

const Inspiration = () => {
	return (
		<div className="inspirationContainer">
			<div className="introducingTextContainer">
				<p className="introducingMainText">Who am I?</p>
				<p className="introducingMainText">I’m Wruszka</p>
				<p className="introducingMainText">Who am I?</p>
			</div>

			<img src={dragon} alt="dragon" className="introducingPhoto" />
		</div>
	);
};

export default Inspiration;
