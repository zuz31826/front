import TextTitle from "../../../../components/textTitle/TextTitle";
import TextInfo from "../../../../components/textInfo/TextInfo";
import dragon from "../../../../assets/images/dragon.png";
import "./inspiration.css";

const Inspiration = () => {
	return (
		<div className="inspirationContainer">
			<TextTitle
				text="What is my inspiration?"
				className="inspirationMainText"
			/>

			<div className="inspirationContentContainer">
				<div className="inspirationTextContainer">
					<TextInfo
						text="I am inspired by the surreal - little sparks of absurdity hidden in
						everyday life."
						className="inspirationSubText"
					/>
					<TextInfo
						text="I live to create and invent all that could be."
						className="inspirationSubText"
					/>
					<TextInfo
						text="Because once I make it it's no longer absurd."
						className="inspirationSubText"
					/>
				</div>

				<img src={dragon} alt="Dragon" className="inspirationPhoto" />
			</div>
		</div>
	);
};

export default Inspiration;
