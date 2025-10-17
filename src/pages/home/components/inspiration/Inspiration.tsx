import dragon from "../../../../assets/images/dragon.png";
import "./inspiration.css";

const Inspiration = () => {
	return (
		<div className="inspirationContainer">
			<p className="inspirationMainText">What is my inspiration?</p>

			<div className="inspirationContentContainer">
				<div className="inspirationTextContainer">
					<p className="inspirationSubText">
						I am inspired by the surreal — little sparks of absurdity hidden in
						everyday life.
					</p>
					<p className="inspirationSubText">
						I live to create and invent all that could be.
					</p>
					<p className="inspirationSubText">
						Because once I make it it’s no longer absurd.
					</p>
				</div>

				<img src={dragon} alt="dragon" className="inspirationPhoto" />
			</div>
		</div>
	);
};

export default Inspiration;
