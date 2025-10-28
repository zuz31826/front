import { useState } from "react";
import { useSketches } from "../../context/SketchContext";
import Skeleton from "../../components/skeleton/Skeleton";
import "./sketchScreen.css";

type Orientation = "horizontal" | "vertical";

const SketchScreen: React.FC = () => {
	const { sketches, loading } = useSketches();

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

	return (
		<div className="sketchContainer">
			<div className="sketchColumn">
				{loading && (
					<>
						{Array.from({ length: 6 }).map((_, i) => (
							<Skeleton key={i} className="sketchSkeleton placeholder" />
						))}
					</>
				)}

				{!loading &&
					sketches[0]?.image?.map((sketch, index) => {
						const data = imageData[sketch.id];
						const orientation = data?.orientation || "";
						const isLoaded = data?.loaded;

						return (
							<div
								key={sketch.id}
								className={`sketchWrapper ${orientation} variant-${index % 3}`}
							>
								{!isLoaded && <Skeleton className="sketchSkeleton active" />}

								<img
									className={`sketchImage ${
										isLoaded ? "visible" : "hidden"
									} ${orientation}`}
									src={sketch.url}
									alt={sketch.alternativeText || `Sketch ${sketch.id}`}
									onLoad={(e) => handleImageLoad(sketch.id, e)}
									loading="lazy"
								/>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default SketchScreen;
