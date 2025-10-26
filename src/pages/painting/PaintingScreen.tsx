import { useState } from "react";
import { usePaintings } from "../../context/PaintingContext";
import Skeleton from "../../components/skeleton/Skeleton";
import border from "../../assets/images/pageBorder.png";
import "./paintingScreen.css";

const PaintingScreen: React.FC = () => {
	const { paintings, loading } = usePaintings();
	const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
	const [orientationMap, setOrientationMap] = useState<Record<number, string>>(
		{}
	);

	const handleImageLoad = (
		id: number,
		e: React.SyntheticEvent<HTMLImageElement>
	) => {
		const img = e.currentTarget;
		const orientation =
			img.naturalWidth > img.naturalHeight ? "horizontal" : "vertical";
		setOrientationMap((prev) => ({ ...prev, [id]: orientation }));
		setLoadedImages((prev) => ({ ...prev, [id]: true }));
	};

	if (loading) {
		return (
			<div className="paintingContainer">
				<Skeleton className="paintingSkeleton" />
			</div>
		);
	}

	return (
		<div className="paintingContainer">
			<img src={border} alt="border" className="paintingBorder left" />
			<img src={border} alt="border" className="paintingBorder right" />

			<div className="paintingColumn">
				{paintings.map((painting, index) => (
					<div
						key={painting.id}
						className={`paintingWrapper ${
							orientationMap[painting.id] || ""
						} variant-${index % 3}`}
					>
						{!loadedImages[painting.id] && (
							<Skeleton className="paintingSkeleton" />
						)}

						<img
							className={`paintingImage ${
								loadedImages[painting.id] ? "visible" : "hidden"
							} ${orientationMap[painting.id] || ""}`}
							src={painting.image?.url}
							alt={painting.image?.alternativeText || painting.name}
							onLoad={(e) => handleImageLoad(painting.id, e)}
						/>

						<div className="paintingOverlay">
							<p className="paintingInfoName">{painting.name}</p>
							<p className="paintingInfoText">{painting.size}</p>
							<p className="paintingInfoText">{painting.materials}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PaintingScreen;
