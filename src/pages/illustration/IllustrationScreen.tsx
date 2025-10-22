import React, { useState } from "react";
import { useIllustrations } from "../../context/IllustrationContext";
import Skeleton from "../../components/skeleton/Skeleton";
import { getImageUrl } from "../../utils";
import "./illustration.css";

const IllustrationScreen: React.FC = () => {
	const { illustrations, loading } = useIllustrations();
	const [activeId, setActiveId] = useState<number | null>(null);

	const handleClick = (id: number) => {
		setActiveId((prev) => (prev === id ? null : id));
	};

	if (loading) {
		return (
			<div className="illustrationContainer">
				<p className="illustrationText">Illustrations</p>
				<Skeleton className="illustrationSkeleton" />
			</div>
		);
	}

	return (
		<div className="illustrationContainer">
			<p className="illustrationText">Illustrations</p>

			<div className="illustrationGrid">
				{illustrations.map((illustration) => (
					<div
						key={illustration.id}
						className={`illustrationWrapper ${
							activeId === illustration.id ? "is-active" : ""
						}`}
						onClick={() => handleClick(illustration.id)}
					>
						<img
							className="illustrationImage"
							src={getImageUrl(illustration.image)}
							alt={illustration.image?.alternativeText || "image"}
						/>
						<div className="illustrationPopup">{illustration.name}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default IllustrationScreen;
