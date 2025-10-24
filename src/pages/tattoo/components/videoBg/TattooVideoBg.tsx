import { useNavigate } from "react-router-dom";
import Button from "../../../../components/button/Button";
import "./tattooVideoBg.css";

const TattooVideoBg: React.FC = () => {
	const navigation = useNavigate();

	const handleBookTattoo = () => navigation("/booking");
	const handlePortfolio = () => navigation("/portfolio");

	return (
		<div className="tattooVideoBgContainer">
			<div className="tattooVideoBgButtonsContainer">
				<Button text="Book a tattoo" onClick={handleBookTattoo} />
				<Button text="Portfolio" onClick={handlePortfolio} />
			</div>
			<video
				src="/video/video2.mp4"
				autoPlay
				muted
				loop
				playsInline
				className="tattooVideoBgVideo"
			/>
		</div>
	);
};

export default TattooVideoBg;
