import TextTitle from "../../../../components/textTitle/TextTitle";
import TextInfo from "../../../../components/textInfo/TextInfo";
import dragon from "../../../../assets/images/dragon.png";
import "./homeInspiration.css";

const HomeInspiration: React.FC = () => {
	return (
		<div className="homeInspirationContainer">
			<TextTitle
				text="What is my inspiration?"
				className="homeInspirationMainText"
			/>

			<div className="homeInspirationContentContainer">
				<div className="homeInspirationTextContainer">
					<TextInfo
						text="I am inspired by the surreal - little sparks of absurdity hidden in
						everyday life."
						className="homeInspirationSubText"
					/>
					<TextInfo
						text="I live to create and invent all that could be."
						className="homeInspirationSubText"
					/>
					<TextInfo
						text="Because once I make it it's no longer absurd."
						className="homeInspirationSubText"
					/>
				</div>

				<img src={dragon} alt="Dragon" className="homeInspirationPhoto" />
			</div>
		</div>
	);
};

export default HomeInspiration;
