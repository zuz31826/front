import { useEffect, useMemo, useRef, useState } from "react";
import { useSketches } from "../../context/SketchContext";
import Skeleton from "../../components/skeleton/Skeleton";
import "./sketchScreen.css";

type Orientation = "horizontal" | "vertical";

const SketchScreen: React.FC = () => {
	const { sketches, loading } = useSketches();

	const [imageData, setImageData] = useState<
		Record<number, { loaded: boolean; orientation: Orientation }>
	>({});
	const [pageIndex, setPageIndex] = useState(0);
	const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
	const [isThrottled, setIsThrottled] = useState(false);

	const allImages = sketches?.[0]?.image ?? [];
	const dotsRef = useRef<HTMLDivElement>(null);

	const totalPages = useMemo(() => {
		if (!allImages.length) return 0;
		return Math.ceil(allImages.length / (isMobile ? 1 : 2));
	}, [allImages.length, isMobile]);

	useEffect(() => {
		const onResize = () => {
			const mobile = window.innerWidth < 768;
			setIsMobile(mobile);
			setPageIndex((p) =>
				Math.min(
					p,
					Math.max(0, Math.ceil(allImages.length / (mobile ? 1 : 2)) - 1)
				)
			);
		};
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [allImages.length]);

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
		if (!allImages.length) return;
		allImages.forEach((sketch) => {
			const img = new Image();
			img.src = sketch.url;
			img.onload = () =>
				setImageData((prev) => ({
					...prev,
					[sketch.id]: {
						loaded: true,
						orientation:
							img.naturalWidth > img.naturalHeight ? "horizontal" : "vertical",
					},
				}));
		});
	}, [allImages]);

	useEffect(() => {
		if (loading || !allImages.length || totalPages === 0) return;

		const handleWheel = (e: WheelEvent) => {
			if (isMobile || isThrottled) return;
			const dy = e.deltaY;
			if (Math.abs(dy) < 5) return;
			setIsThrottled(true);
			if (dy > 0) {
				setPageIndex((p) => Math.min(p + 1, totalPages - 1));
			} else {
				setPageIndex((p) => Math.max(p - 1, 0));
			}
			const TO = window.setTimeout(() => setIsThrottled(false), 450);
			return () => window.clearTimeout(TO);
		};

		let touchStartX = 0;
		let touchEndX = 0;

		const handleTouchStart = (e: TouchEvent) => {
			touchStartX = e.touches[0].clientX;
		};

		const handleTouchEnd = (e: TouchEvent) => {
			touchEndX = e.changedTouches[0].clientX;
			const diff = touchStartX - touchEndX;

			if (Math.abs(diff) < 50 || isThrottled) return;

			setIsThrottled(true);
			if (diff > 0) {
				setPageIndex((p) => Math.min(p + 1, totalPages - 1));
			} else {
				setPageIndex((p) => Math.max(p - 1, 0));
			}
			const TO = window.setTimeout(() => setIsThrottled(false), 450);
			return () => window.clearTimeout(TO);
		};

		window.addEventListener("wheel", handleWheel, { passive: true });
		window.addEventListener("touchstart", handleTouchStart, { passive: true });
		window.addEventListener("touchend", handleTouchEnd, { passive: true });

		return () => {
			window.removeEventListener("wheel", handleWheel);
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchend", handleTouchEnd);
		};
	}, [loading, allImages.length, totalPages, isThrottled, isMobile]);

	useEffect(() => {
		const dotsContainer = dotsRef.current;
		if (!dotsContainer) return;

		const activeDot = dotsContainer.children[pageIndex] as HTMLElement | null;
		if (!activeDot) return;

		const containerWidth = dotsContainer.clientWidth;
		const scrollLeft =
			activeDot.offsetLeft - containerWidth / 2 + activeDot.clientWidth / 2;

		dotsContainer.scrollTo({
			left: scrollLeft,
			behavior: "smooth",
		});
	}, [pageIndex]);

	useEffect(() => {
		const wrapper = dotsRef.current?.parentElement;
		const dots = dotsRef.current;
		if (!wrapper || !dots) return;

		const dotsWidth = dots.scrollWidth;
		const wrapperWidth = wrapper.clientWidth;

		wrapper.style.setProperty(
			"--dots-justify",
			dotsWidth <= wrapperWidth ? "center" : "flex-start"
		);
	}, [totalPages, isMobile]);

	const visibleImages = useMemo(() => {
		if (!allImages.length || totalPages === 0) return [];
		if (isMobile) {
			return [allImages[Math.min(pageIndex, allImages.length - 1)]].filter(
				Boolean
			);
		}
		const start = pageIndex * 2;
		return allImages.slice(start, start + 2);
	}, [allImages, pageIndex, isMobile, totalPages]);

	return (
		<div className="bookContainer">
			<div className={`book ${isMobile ? "mobile" : "desktop"}`}>
				{loading && (
					<>
						<div className="page">
							<Skeleton className="sketchSkeleton active" />
						</div>
						{!isMobile && (
							<div className="page">
								<Skeleton className="sketchSkeleton active" />
							</div>
						)}
					</>
				)}

				{!loading &&
					visibleImages.map((sketch) => {
						const data = imageData[sketch.id];
						const orientation = data?.orientation || "";
						const isLoaded = data?.loaded;

						return (
							<div key={sketch.id} className={`page ${orientation}`}>
								{!isLoaded && <Skeleton className="sketchSkeleton active" />}
								<img
									className={`sketchImage ${
										isLoaded ? "visible" : "hidden"
									} ${orientation}`}
									src={sketch.url}
									alt={sketch.alternativeText || `Sketch ${sketch.id}`}
									onLoad={(e) => handleImageLoad(sketch.id, e)}
								/>
							</div>
						);
					})}
			</div>

			{!loading && totalPages > 1 && (
				<div className="pageIndicatorsWrapper">
					<div className="pageIndicators" ref={dotsRef}>
						{Array.from({ length: totalPages }).map((_, i) => (
							<button
								key={i}
								className={`dot ${i === pageIndex ? "active" : ""}`}
								onClick={() => setPageIndex(i)}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default SketchScreen;
