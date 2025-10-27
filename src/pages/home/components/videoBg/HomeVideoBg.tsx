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
		const cachedKey = "_cachedHomeVideo";

		if ((window as any)[cachedKey]) {
			video = (window as any)[cachedKey];
		} else {
			video = document.createElement("video");
			video.src = "/video/home.mp4";
			video.autoplay = true;
			video.muted = true;
			video.loop = true;
			video.playsInline = true;
			video.preload = "auto";
			video.className = "homeVideoBg";
			video.addEventListener("loadeddata", () => {
				video.classList.add("loaded");
			});
			(window as any)[cachedKey] = video;
		}

		if (containerRef.current && !containerRef.current.contains(video)) {
			containerRef.current.prepend(video);
		}

		video.play().catch(() => {});

		return () => {};
	}, []);

	return (
		<div className="homeVideoBgContainer" ref={containerRef}>
			<div className="homeVideoBgOverlay" />
			<div className="homeVideoBgButtonsContainer">
				<ButtonImg
					image={tattoo}
					alt="Tattoo"
					onClick={() => navigation("/tattoo")}
				/>
				<ButtonImg
					image={visual}
					alt="Visual"
					onClick={() => navigation("/visual-art")}
				/>
			</div>
		</div>
	);
};

export default HomeVideoBg;
