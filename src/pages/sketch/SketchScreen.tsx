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

	const allImages = sketches?.[0]?.image ?? [];
	const dotsRef = useRef<HTMLDivElement>(null);

	const throttledRef = useRef(false);
	const timerRef = useRef<number | undefined>(undefined);
	const tStartX = useRef(0);
	const tStartY = useRef(0);
	const tEndX = useRef(0);
	const tEndY = useRef(0);

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
		if (loading || !allImages.length || totalPages === 0) return;

		const handleWheel = (e: WheelEvent) => {
			if (isMobile) return;
			if (throttledRef.current) return;

			const dy = e.deltaY;
			if (Math.abs(dy) < 5) return;

			throttledRef.current = true;

			if (dy > 0) setPageIndex((p) => Math.min(p + 1, totalPages - 1));
			else setPageIndex((p) => Math.max(p - 1, 0));

			if (timerRef.current) window.clearTimeout(timerRef.current);
			timerRef.current = window.setTimeout(() => {
				throttledRef.current = false;
			}, 450);
		};

		window.addEventListener("wheel", handleWheel, { passive: true });
		return () => {
			window.removeEventListener("wheel", handleWheel);
			if (timerRef.current) window.clearTimeout(timerRef.current);
		};
	}, [loading, allImages.length, totalPages, isMobile]);

	useEffect(() => {
		if (loading || !isMobile) return;

		const handleTouchStart = (e: TouchEvent) => {
			const t = e.touches[0];
			tStartX.current = t.clientX;
			tStartY.current = t.clientY;
			tEndX.current = t.clientX;
			tEndY.current = t.clientY;
		};

		const handleTouchMove = (e: TouchEvent) => {
			const t = e.touches[0];
			tEndX.current = t.clientX;
			tEndY.current = t.clientY;
		};

		const handleTouchEnd = () => {
			if (throttledRef.current) return;

			const diffX = tStartX.current - tEndX.current;
			const diffY = Math.abs(tStartY.current - tEndY.current);

			if (diffY > 60) return;
			if (Math.abs(diffX) < 70) return;

			throttledRef.current = true;

			if (diffX > 0) {
				setPageIndex((p) => Math.min(p + 1, totalPages - 1));
			} else {
				setPageIndex((p) => Math.max(p - 1, 0));
			}

			if (timerRef.current) window.clearTimeout(timerRef.current);
			timerRef.current = window.setTimeout(() => {
				throttledRef.current = false;
			}, 450);
		};

		window.addEventListener("touchstart", handleTouchStart, { passive: true });
		window.addEventListener("touchmove", handleTouchMove, { passive: true });
		window.addEventListener("touchend", handleTouchEnd, { passive: true });

		return () => {
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("touchend", handleTouchEnd);
			if (timerRef.current) window.clearTimeout(timerRef.current);
		};
	}, [loading, isMobile, totalPages]);

	useEffect(() => {
		const dotsContainer = dotsRef.current;
		if (!dotsContainer) return;

		const activeDot = dotsContainer.children[pageIndex] as HTMLElement | null;
		if (!activeDot) return;

		const containerWidth = dotsContainer.clientWidth;
		const scrollLeft =
			activeDot.offsetLeft - containerWidth / 2 + activeDot.clientWidth / 2;

		dotsContainer.scrollTo({ left: scrollLeft, behavior: "smooth" });
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
