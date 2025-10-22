import ButtonImg from "../../../../components/buttonImg/ButtonImg";
import video from "../../../../assets/video/video.mp4";
import tattoo from "../../../../assets/images/tattoo.png";
import visual from "../../../../assets/images/visual.png";
import "./homeVideoBg.css";

const HomeVideoBg: React.FC = () => {
	return (
		<div className="homeVideoBgContainer">
			<video src={video} autoPlay muted loop className="homeVideoBg" />

			<div className="homeVideoBgButtonsContainer">
				<ButtonImg
					image={tattoo}
					alt="Tattoo"
					onClick={() => console.log("Tattoo clicked")}
				/>
				<ButtonImg
					image={visual}
					alt="Visual"
					onClick={() => console.log("Visual clicked")}
				/>
			</div>
		</div>
	);
};

export default HomeVideoBg;
``;
