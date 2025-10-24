import { Link, useNavigate } from "react-router-dom";
import video from "../../../../assets/video/video2.mp4";
import "./tattooVideoBg.css";
import Button from "../../../../components/button/Button";

const TattooVideoBg: React.FC = () => {
	const navigation = useNavigate();

	const handleBookTattoo = () => navigation("/booking");

	return (
		<div className="tattooVideoBgContainer">
			<p className="tattooVideoBgText">
				Tattooing is the ultimate collaborative process. The way I create my
				tattoos is a tribute to the other person's self expression. Its an
				invitation to show up as yourself.
			</p>
			<div className="tattooVideoBgVideoOverlay">
				<div className="tattooVideoBgButtonsContainer">
					<Button text="Book a tattoo" onClick={handleBookTattoo} />
					<Button text="Portfolio" />
				</div>
				<video src={video} autoPlay muted loop className="tattooVideoBg" />
			</div>

			<Link
				to="https://www.instagram.com/wruszkatutuasz"
				target="_blank"
				rel="noopener noreferrer"
			>
				<p className="tattooVideoBgLink">@wruszkatutuasz</p>
			</Link>
		</div>
	);
};

export default TattooVideoBg;
