import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ButtonImg from "../../../../components/buttonImg/ButtonImg";
import tattoo from "../../../../assets/images/tattoo.png";
import visual from "../../../../assets/images/visual.png";
import "./homeVideoBg.css";

const HomeVideoBg: React.FC = () => {
	const navigation = useNavigate();
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		let video: HTMLVideoElement;

		if ((window as any)._cachedVideo) {
			video = (window as any)._cachedVideo;
		} else {
			video = document.createElement("video");
			video.src = "/video/video.mp4";
			video.autoplay = true;
			video.muted = true;
			video.loop = true;
			video.playsInline = true;
			video.preload = "auto";
			video.className = "homeVideoBg";
			video.addEventListener("loadeddata", () => {
				video.classList.add("loaded");
			});
			(window as any)._cachedVideo = video;
		}

		if (containerRef.current && !containerRef.current.contains(video)) {
			containerRef.current.prepend(video);
		}

		video.play().catch(() => {});

		return () => {};
	}, []);

	return (
		<div className="homeVideoBgContainer" ref={containerRef}>
			<div className="homeVideoBgButtonsContainer">
				<ButtonImg
					image={tattoo}
					alt="Tattoo"
					onClick={() => navigation("/tattoo")}
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
