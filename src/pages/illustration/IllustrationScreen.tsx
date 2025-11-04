import { useEffect, useState } from "react";
import { useIllustrations } from "../../context/IllustrationContext";
import Skeleton from "../../components/skeleton/Skeleton";
import border from "../../assets/images/pageBorder.png";
import type { Orientation } from "../../types";
import "./illustrationScreen.css";

const IllustrationScreen: React.FC = () => {
	const { illustrations, loading } = useIllustrations();

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
		<div className="illustrationContainer">
			<img src={border} alt="border" className="illustrationBorder left" />
			<img src={border} alt="border" className="illustrationBorder right" />

			<div className="illustrationColumn">
				{loading && (
					<>
						{Array.from({ length: 6 }).map((_, i) => (
							<Skeleton key={i} className="illustrationSkeleton placeholder" />
						))}
					</>
				)}

				{!loading &&
					illustrations[0]?.image?.map((illustration, index) => {
						const data = imageData[illustration.id];
						const orientation = data?.orientation || "";
						const isLoaded = data?.loaded;

						return (
							<div
								key={illustration.id}
								className={`illustrationWrapper ${orientation} variant-${
									index % 3
								}`}
							>
								{!isLoaded && (
									<Skeleton className="illustrationSkeleton placeholder active" />
								)}

								<img
									className={`illustrationImage ${
										isLoaded ? "visible" : "hidden"
									} ${orientation}`}
									src={illustration.url}
									alt={
										illustration.alternativeText ||
										`Illustration ${illustration.id}`
									}
									onLoad={(e) => handleImageLoad(illustration.id, e)}
									loading="lazy"
								/>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default IllustrationScreen;
