import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ButtonImg from "../../../../components/buttonImg/ButtonImg";
import booking from "../../../../assets/images/booking.png";
import portfolio from "../../../../assets/images/portfolio.png";
import "./tattooVideoBg.css";

const TattooVideoBg: React.FC = () => {
	const navigation = useNavigate();
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		let video: HTMLVideoElement;
		const cachedKey = "_cachedTattooVideo";

		if ((window as any)[cachedKey]) {
			video = (window as any)[cachedKey];
		} else {
			video = document.createElement("video");
			video.src = "/video/tattoo.webm";
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

	const handleBookTattoo = () => navigation("/booking");
	const handlePortfolio = () => navigation("/portfolio");

	return (
		<div className="tattooVideoBgContainer" ref={containerRef}>
			<div className="tattooVideoBgOverlay" />
			<div className="tattooVideoBgButtonsContainer">
				<ButtonImg image={booking} alt="Booking" onClick={handleBookTattoo} />
				<ButtonImg
					image={portfolio}
					alt="Portfolio"
					onClick={handlePortfolio}
				/>
			</div>
		</div>
	);
};

export default TattooVideoBg;
