import { useState } from "react";
import Skeleton from "../../../../components/skeleton/Skeleton";
import polaroid from "../../../../assets/images/polaroid.png";
import about from "../../../../assets/images/about.png";
import "./aboutMeTopPh.css";

const AboutMeTopPh: React.FC = () => {
	const [imagesLoaded, setImagesLoaded] = useState({
		polaroid: false,
		about: false,
	});

	const handleLoad = (key: "polaroid" | "about") =>
		setImagesLoaded((prev) => ({ ...prev, [key]: false }));

	return (
		<div className="aboutMeTopPhContainer">
			<div className="aboutMeTopPhWrapper">
				{!imagesLoaded.polaroid && (
					<div className="aboutMeTopPhSkeletonWrapper">
						<Skeleton className="aboutMeTopPhSkeleton" height={300} />
					</div>
				)}
				<img
					src={polaroid}
					alt="Polaroid"
					className={`aboutMeTopPhPolaroid ${
						imagesLoaded.polaroid ? "visible" : "hidden"
					}`}
					onLoad={() => handleLoad("polaroid")}
				/>
			</div>

			<div className="aboutMeTopPhWrapper">
				{!imagesLoaded.about && (
					<div className="aboutMeTopPhSkeletonWrapper">
						<Skeleton
							className="aboutMeTopPhSkeleton aboutMeTopPhSkeletonAbout"
							height={100}
						/>
					</div>
				)}
				<img
					src={about}
					alt="About Me"
					className={`aboutMeTopPhAbout ${
						imagesLoaded.about ? "visible" : "hidden"
					}`}
					onLoad={() => handleLoad("about")}
				/>
			</div>
		</div>
	);
};

export default AboutMeTopPh;
