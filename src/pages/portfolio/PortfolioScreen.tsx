import React from "react";
import { usePortfolio } from "../../context/portfolioContext";
import Skeleton from "../../components/skeleton/Skeleton";
import "./portfolioScreen.css";

const PortfolioScreen: React.FC = () => {
	const { portfolio, loading } = usePortfolio();

	const photos = portfolio[0]?.portfolio || [];

	return (
		<div className="portfolioContainer">
			{loading
				? Array.from({ length: 9 }).map((_, index) => (
						<Skeleton key={index} width="100%" height={500} />
				  ))
				: photos.map((photo) => (
						<div key={photo.id} className="portfolioItem">
							<img
								src={photo.url}
								alt={photo.name}
								className="portfolioImage"
							/>
						</div>
				  ))}
		</div>
	);
};

export default PortfolioScreen;
