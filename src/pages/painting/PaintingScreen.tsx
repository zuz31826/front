import { useEffect, useState } from "react";
import { usePaintings } from "../../context/PaintingContext";
import Skeleton from "../../components/skeleton/Skeleton";
import border from "../../assets/images/pageBorder.png";
import "./paintingScreen.css";

type Orientation = "horizontal" | "vertical";

const PaintingScreen: React.FC = () => {
	const { paintings, loading } = usePaintings();

	const [imageData, setImageData] = useState<
		Record<number, { loaded: boolean; orientation: Orientation }>
	>({});

	const handleImageLoad = (
		id: number,
		e: React.SyntheticEvent<HTMLImageElement>
	) => {
		const img = e.currentTarget;
		const orientation: Orientation =
			img.naturalWidth > img.naturalHeight ? "horizontal" : "vertical";

		setImageData((prev) => ({
			...prev,
			[id]: { loaded: true, orientation },
		}));
	};

	useEffect(() => {
		const setVh = () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		};
		setVh();
		window.addEventListener("resize", setVh);
		return () => window.removeEventListener("resize", setVh);
	}, []);

	return (
		<div className="paintingContainer">
			<img src={border} alt="border" className="paintingBorder left" />
			<img src={border} alt="border" className="paintingBorder right" />

			<div className="paintingColumn">
				{loading && (
					<>
						{Array.from({ length: 6 }).map((_, i) => (
							<Skeleton key={i} className="paintingSkeleton placeholder" />
						))}
					</>
				)}

				{!loading &&
					paintings.map((painting, index) => {
						const data = imageData[painting.id];
						const orientation = data?.orientation || "";
						const isLoaded = data?.loaded;

						return (
							<div
								key={painting.id}
								className={`paintingWrapper ${orientation} variant-${
									index % 3
								}`}
							>
								{!isLoaded && (
									<Skeleton className="paintingSkeleton placeholder active" />
								)}

								<img
									className={`paintingImage ${
										isLoaded ? "visible" : "hidden"
									} ${orientation}`}
									src={painting.image?.url}
									alt={painting.image?.alternativeText || painting.name}
									onLoad={(e) => handleImageLoad(painting.id, e)}
									loading="lazy"
								/>

								<div className="paintingOverlay">
									<p className="paintingInfoName">{painting.name}</p>
									<p className="paintingInfoText">{painting.size}</p>
									<p className="paintingInfoText">{painting.materials}</p>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default PaintingScreen;
