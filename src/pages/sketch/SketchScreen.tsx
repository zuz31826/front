import { useEffect, useMemo, useRef, useState } from "react";
import { useSketches } from "../../context/SketchContext";
import Skeleton from "../../components/skeleton/Skeleton";
import type { Orientation } from "../../types";
import "./sketchScreen.css";

const SketchScreen: React.FC = () => {
	const { sketches, loading } = useSketches();

	const [imageData, setImageData] = useState<
		Record<string, { loaded: boolean; orientation: Orientation }>
	>({});
	const [pageIndex, setPageIndex] = useState(0);
	const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
	const [transformX, setTransformX] = useState(0);

	const throttledRef = useRef(false);
	const timerRef = useRef<number | undefined>(undefined);
	const tStartX = useRef(0);
	const tStartY = useRef(0);
	const tEndX = useRef(0);
	const tEndY = useRef(0);
	const dotsRef = useRef<HTMLDivElement>(null);

	const allImages = sketches?.[0]?.image ?? [];

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

			if (timerRef.current) clearTimeout(timerRef.current);
			timerRef.current = window.setTimeout(
				() => (throttledRef.current = false),
				450
			);
		};

		window.addEventListener("wheel", handleWheel, { passive: true });
		return () => {
			window.removeEventListener("wheel", handleWheel);
			if (timerRef.current) clearTimeout(timerRef.current);
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
			if (diffY > 60 || Math.abs(diffX) < 70) return;

			throttledRef.current = true;
			if (diffX > 0) setPageIndex((p) => Math.min(p + 1, totalPages - 1));
			else setPageIndex((p) => Math.max(p - 1, 0));

			if (timerRef.current) clearTimeout(timerRef.current);
			timerRef.current = window.setTimeout(
				() => (throttledRef.current = false),
				450
			);
		};

		window.addEventListener("touchstart", handleTouchStart, { passive: true });
		window.addEventListener("touchmove", handleTouchMove, { passive: true });
		window.addEventListener("touchend", handleTouchEnd, { passive: true });

		return () => {
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("touchend", handleTouchEnd);
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [loading, isMobile, totalPages]);

	useEffect(() => {
		const dots = dotsRef.current;
		const wrapper = dots?.parentElement;
		if (!dots || !wrapper) return;

		const wrapperWidth = wrapper.clientWidth;

		if (!dots.dataset.padded) {
			dots.style.paddingLeft = `${wrapperWidth / 2}px`;
			dots.style.paddingRight = `${wrapperWidth / 2}px`;
			dots.dataset.padded = "true";
		}

		const center = () => {
			const active = dots.children[pageIndex] as HTMLElement | null;
			if (!active) return;

			const activeCenter = active.offsetLeft + active.clientWidth / 2;
			const totalWidth = dots.scrollWidth;

			let newX = wrapperWidth / 2 - activeCenter;

			const maxX = wrapperWidth / 2;
			const minX = wrapperWidth - totalWidth - wrapperWidth / 2;

			if (newX > maxX) newX = maxX;
			if (newX < minX) newX = minX;

			setTransformX(newX);
		};

		const id = requestAnimationFrame(center);
		return () => cancelAnimationFrame(id);
	}, [pageIndex, totalPages, isMobile]);

	const visibleImages = useMemo(() => {
		if (!allImages.length || totalPages === 0) return [];
		if (isMobile) return [allImages[Math.min(pageIndex, allImages.length - 1)]];
		const start = pageIndex * 2;
		return allImages.slice(start, start + 2);
	}, [allImages, pageIndex, isMobile, totalPages]);

	return (
		<div className="sketchContainer">
			<div className={`sketchInner ${isMobile ? "mobile" : "desktop"}`}>
				{!loading &&
					visibleImages.map((sketch) => {
						const data = imageData[sketch.id];
						const orientation = data?.orientation || "";
						const isLoaded = data?.loaded;

						return (
							<div
								key={sketch.id}
								className={`sketchPage ${orientation} ${
									isLoaded ? "loaded" : ""
								}`}
							>
								{!isLoaded && (
									<div className="sketchSkeletonWrapper">
										<Skeleton
											className="sketchSkeleton placeholder"
											width={"70%"}
											height={"100%"}
										/>
									</div>
								)}

								<img
									className={`sketchImage ${
										isLoaded ? "visible" : "hidden"
									} ${orientation}`}
									src={sketch.url}
									alt={sketch.alternativeText || `Sketch ${sketch.id}`}
									onLoad={(e) => {
										const img = e.currentTarget;
										const orientation: Orientation =
											img.naturalWidth > img.naturalHeight
												? "horizontal"
												: "vertical";
										setImageData((prev) => ({
											...prev,
											[sketch.id]: { loaded: true, orientation },
										}));
									}}
								/>
							</div>
						);
					})}
			</div>

			{!loading && totalPages > 1 && (
				<div className="sketchIndicatorsContainer">
					<div
						className="sketchIndicatorsInner"
						ref={dotsRef}
						style={{ transform: `translateX(${transformX}px)` }}
					>
						{Array.from({ length: totalPages }).map((_, i) => (
							<button
								key={i}
								className={`sketchDot ${i === pageIndex ? "active" : ""}`}
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
