import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/button/Button";
import "./tattooVideoBg.css";

const TattooVideoBg: React.FC = () => {
	const navigation = useNavigate();
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		let video: HTMLVideoElement;

		if ((window as any)._cachedTattooVideo) {
			video = (window as any)._cachedTattooVideo;
		} else {
			video = document.createElement("video");
			video.src = "/video/video2.webm";
			video.autoplay = true;
			video.muted = true;
			video.loop = true;
			video.playsInline = true;
			video.preload = "auto";
			video.className = "tattooVideoBgVideo";
			video.addEventListener("loadeddata", () => {
				video.classList.add("loaded");
			});
			(window as any)._cachedTattooVideo = video;
		}

		if (containerRef.current && !containerRef.current.contains(video)) {
			containerRef.current.prepend(video);
		}

		video.play().catch(() => {});

		return () => {};
	}, []);

	const handleBookTattoo = () => navigation("/booking");
	const handlePortfolio = () => navigation("/portfolio");

	return (
		<div className="tattooVideoBgContainer" ref={containerRef}>
			<div className="tattooVideoBgOverlay" />
			<div className="tattooVideoBgButtonsContainer">
				<Button text="Book a tattoo" onClick={handleBookTattoo} />
				<Button text="Portfolio" onClick={handlePortfolio} />
			</div>
		</div>
	);
};

export default TattooVideoBg;
