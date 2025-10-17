import Button from "../../../../components/button/Button";
import video from "../../../../assets/video/video.mp4";
import "./videoBg.css";

const VideoBg: React.FC = () => {
	return (
		<div className="videoBgContainer">
			<video src={video} autoPlay muted loop className="videoBg" />

			<div className="videoBgButtonsContainer">
				<Button text={"Tattoos"} />
				<Button text={"Visual art"} />
			</div>
		</div>
	);
};

export default VideoBg;
