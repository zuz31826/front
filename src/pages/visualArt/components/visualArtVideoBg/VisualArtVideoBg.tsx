import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ButtonImg from "../../../../components/buttonImg/ButtonImg";
import painting from "../../../../assets/images/paintingButt.png";
import illustration from "../../../../assets/images/illustrationButt.png";
import sketchbook from "../../../../assets/images/sketchbookButt.png";
import "./visualArtVideoBg.css";

const VisualArtVideoBg: React.FC = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const navigation = useNavigate();

	useEffect(() => {
		let video: HTMLVideoElement;
		const cachedKey = "_cachedVisualArtVideo";

		if ((window as any)[cachedKey]) {
			video = (window as any)[cachedKey];
		} else {
			video = document.createElement("video");
			video.src = "/video/visual.mp4";
			video.autoplay = true;
			video.muted = true;
			video.loop = true;
			video.playsInline = true;
			video.preload = "auto";
			video.className = "visualArtVideoBgVideo";
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
		<div className="visualArtVideoBgContainer" ref={containerRef}>
			<div className="visualArtVideoBgButtonsContainer">
				<ButtonImg
					image={painting}
					alt="Painting"
					onClick={() => navigation("/painting")}
				/>
				<ButtonImg
					image={illustration}
					alt="Illustration"
					onClick={() => navigation("/illustration")}
				/>
				<ButtonImg
					image={sketchbook}
					alt="Tattoo"
					onClick={() => navigation("/sketch")}
				/>
			</div>
		</div>
	);
};

export default VisualArtVideoBg;
