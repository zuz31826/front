import TextTitle from "../../../../components/textTitle/TextTitle";
import TextInfo from "../../../../components/textInfo/TextInfo";
import "./collaboration.css";

const Collaboration: React.FC = () => {
	return (
		<div className="collaborationContainer">
			<TextTitle text="Collaboration" className="collaborationMainText" />

			<div className="collaborationContentContainer">
				<TextInfo
					text={`I’m open to artistic collaborations — <br />
					whether it be tattoos, character design,
					<br /> graphic design, or illustration.`}
					className="collaborationText"
				/>
				<TextInfo
					text={`I work with mixed media — from oil paint,<br />markers and crayons to digital art.`}
					className="collaborationText"
				/>
			</div>
		</div>
	);
};

export default Collaboration;
