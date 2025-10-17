import ButtonImg from "../../../../components/buttonImg/ButtonImg";
import video from "../../../../assets/video/video.mp4";
import tattoo from "../../../../assets/images/tattoo.png";
import visual from "../../../../assets/images/visual.png";
import "./videoBg.css";

const VideoBg: React.FC = () => {
	return (
		<div className="videoBgContainer">
			<video src={video} autoPlay muted loop className="videoBg" />

			<div className="videoBgButtonsContainer">
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

export default VideoBg;
``;
