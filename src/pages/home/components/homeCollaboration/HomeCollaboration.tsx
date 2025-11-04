import TextTitle from "../../../../components/textTitle/TextTitle";
import TextInfo from "../../../../components/textInfo/TextInfo";
import "./homeCollaboration.css";

const HomeCollaboration: React.FC = () => {
	return (
		<div className="homeCollaborationContainer">
			<TextTitle text="Collaboration" className="homeCollaborationMainText" />

			<div className="homeCollaborationContentContainer">
				<TextInfo
					text={`I’m open to artistic collaborations — <br />
					whether it be tattoos, character design,
					<br /> graphic design, or illustration.`}
					className="homeCollaborationText"
				/>
				<TextInfo
					text={`I work with mixed media — from oil paint,<br />markers and crayons to digital art.`}
					className="homeCollaborationText"
				/>
			</div>
		</div>
	);
};

export default HomeCollaboration;
