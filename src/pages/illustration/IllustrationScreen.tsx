import { useState } from "react";
import { useIllustrations } from "../../context/IllustrationContext";
import Skeleton from "../../components/skeleton/Skeleton";
import border from "../../assets/images/pageBorder.png";
import "./illustrationScreen.css";

const IllustrationScreen: React.FC = () => {
	const { illustrations, loading } = useIllustrations();
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
			<div className="illustrationContainer">
				<Skeleton className="illustrationSkeleton" />
			</div>
		);
	}

	return (
		<div className="illustrationContainer">
			<img src={border} alt="border" className="illustrationBorder left" />
			<img src={border} alt="border" className="illustrationBorder right" />

			<div className="illustrationColumn">
				{illustrations[0]?.image.map((illustration, index) => (
					<div
						key={illustration.id}
						className={`illustrationWrapper ${
							orientationMap[illustration.id] || ""
						} variant-${index % 3}`}
					>
						{!loadedImages[illustration.id] && (
							<Skeleton className="illustrationSkeleton" />
						)}
						<img
							className={`illustrationImage ${
								loadedImages[illustration.id] ? "visible" : "hidden"
							} ${orientationMap[illustration.id] || ""}`}
							src={illustration?.url}
							alt={illustration?.alternativeText || "illustration"}
							onLoad={(e) => handleImageLoad(illustration.id, e)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default IllustrationScreen;
