import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import Skeleton from "../../components/skeleton/Skeleton";
import "./portfolioScreen.css";

const PortfolioScreen: React.FC = () => {
	const { portfolio, loading } = usePortfolio();
	const photos = portfolio[0]?.portfolio || [];

	const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

	const handleImageLoad = (id: number) =>
		setLoadedImages((prev) => ({ ...prev, [id]: true }));

	return (
		<div className="portfolioContainer">
			{loading
				? Array.from({ length: 9 }).map((_, index) => (
						<div key={index} className="portfolioSkeletonContainer">
							<Skeleton width="100%" height="100%" />
						</div>
				  ))
				: photos.map((photo) => (
						<div key={photo.id} className="portfolioItem">
							{!loadedImages[photo.id] && (
								<div className="portfolioSkeletonContainer">
									<Skeleton width="100%" height="100%" />
								</div>
							)}

							<img
								src={photo.url}
								alt={photo.name}
								className={`portfolioImage ${
									loadedImages[photo.id] ? "visible" : "hidden"
								}`}
								onLoad={() => handleImageLoad(photo.id)}
							/>
						</div>
				  ))}
		</div>
	);
};

export default PortfolioScreen;
