import TextTitle from "../../../../components/textTitle/TextTitle";
import photo from "../../../../assets/images/zuzPh.png";
import introducing from "../../../../assets/images/introducing.png";
import "./homeIntroducing.css";

const HomeIntroducing: React.FC = () => {
	return (
		<div className="homeIntroducingContainer">
			<div className="homeIntroducingTextContainer">
				<TextTitle text="Who am I?" className="homeIntroducingMainText" />
				<TextTitle text="I’m Wruszka" className="homeIntroducingMainText" />

				<img
					src={introducing}
					alt="here should be a Portrait"
					className="homeIntroducingIllustration"
				/>
			</div>
			<img src={photo} alt="Zuz" className="homeIntroducingPhoto" />
		</div>
	);
};

export default HomeIntroducing;
