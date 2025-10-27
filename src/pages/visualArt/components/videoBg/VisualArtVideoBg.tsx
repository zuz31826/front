import { useEffect, useRef } from "react";
import "./visualArtVideoBg.css";

const VisualArtVideoBg: React.FC = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);

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
			video.className = "tattooVideoBgVideo";
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
		<div className="tattooVideoBgContainer" ref={containerRef}>
			<div className="tattooVideoBgOverlay" />
		</div>
	);
};

export default VisualArtVideoBg;
