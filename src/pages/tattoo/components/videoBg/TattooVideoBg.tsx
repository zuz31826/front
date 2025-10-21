import ButtonImg from "../../../../components/buttonImg/ButtonImg";
import video from "../../../../assets/video/video2.mp4";
import tattoo from "../../../../assets/images/tattoo.png";
import visual from "../../../../assets/images/visual.png";
import "./tattooVideoBg.css";

const TattooVideoBg: React.FC = () => {
	return (
		<div className="tattooVideoBgContainer">
			<p className="tattooVideoBgLink">
				Tattooing is the ultimate collaborative process. The way I create my
				tattoos is a tribute to the other person's self expression. Its an
				invitation to show up as yourself.
			</p>
			<video src={video} autoPlay muted loop className="tattooVideoBg" />
			{/* <div className="tattooVideoBgButtonsContainer">
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
			</div> */}
			<p className="tattooVideoBgLink">instagram link</p>
		</div>
	);
};

export default TattooVideoBg;
``;
