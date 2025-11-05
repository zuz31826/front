import { useNavigate } from "react-router-dom";
import TextTitle from "../../../../components/textTitle/TextTitle";
import TextInfo from "../../../../components/textInfo/TextInfo";
import ButtonImg from "../../../../components/buttonImg/ButtonImg";
import contact from "../../../../assets/images/contactButt.png";
import "./homeCollaboration.css";

const HomeCollaboration: React.FC = () => {
	const navigation = useNavigate();

	return (
		<div className="homeCollaborationContainer">
			<TextTitle text="Collaboration" className="homeCollaborationMainText" />

			<div className="homeCollaborationContentContainer">
				<TextInfo
					text={`I’m open to artistic collaborations — <br />
					whether it be tattoos, character design,
					 graphic design, or illustration.`}
					className="homeCollaborationText"
				/>
				<TextInfo
					text={`I work with mixed media — from oil paint,<br />markers and crayons to digital art.`}
					className="homeCollaborationText"
				/>
				<TextInfo
					text={`If you are interested in working with me, click here to find out where to reach me:`}
					className="homeCollaborationText"
				/>

				<div className="homeCollaborationButtonContainer">
					<ButtonImg
						image={contact}
						alt="Contact"
						onClick={() => navigation("/contact")}
					/>
				</div>
			</div>
		</div>
	);
};

export default HomeCollaboration;
