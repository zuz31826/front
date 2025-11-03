import { useEffect, useMemo, useRef, useState } from "react";
import Skeleton from "../../../../components/skeleton/Skeleton";
import "./horizontalCarousel.css";

type Orientation = "horizontal" | "vertical";

interface HorizontalCarouselProps {
	images: {
		id: number;
		url: string;
		alternativeText?: string | null;
	}[];
}

const HorizontalCarousel: React.FC<HorizontalCarouselProps> = ({ images }) => {
	const [imageData, setImageData] = useState<
		Record<number, { loaded: boolean; orientation: Orientation }>
	>({});
	const [pageIndex, setPageIndex] = useState(0);
	const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
	const [transformX, setTransformX] = useState(0);

	const throttledRef = useRef(false);
	const timerRef = useRef<number | undefined>(undefined);
	const dotsRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const totalPages = useMemo(() => {
		if (!images.length) return 0;
		return Math.ceil(images.length / (isMobile ? 1 : 2));
	}, [images.length, isMobile]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const preventScroll = (e: WheelEvent) => {
			e.preventDefault();
		};

		container.addEventListener("mouseenter", () => {
			window.addEventListener("wheel", preventScroll, { passive: false });
		});

		container.addEventListener("mouseleave", () => {
			window.removeEventListener("wheel", preventScroll);
		});

		const preventTouchMove = (e: TouchEvent) => e.preventDefault();

		container.addEventListener("touchstart", () => {
			document.body.style.overflow = "hidden";
			window.addEventListener("touchmove", preventTouchMove, {
				passive: false,
			});
		});

		container.addEventListener("touchend", () => {
			document.body.style.overflow = "";
			window.removeEventListener("touchmove", preventTouchMove);
		});

		return () => {
			window.removeEventListener("wheel", preventScroll);
			window.removeEventListener("touchmove", preventTouchMove);
			document.body.style.overflow = "";
		};
	}, []);

	useEffect(() => {
		const onResize = () => {
			const mobile = window.innerWidth < 768;
			setIsMobile(mobile);
			setPageIndex((p) =>
				Math.min(
					p,
					Math.max(0, Math.ceil(images.length / (mobile ? 1 : 2)) - 1)
				)
			);
		};
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [images.length]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container || isMobile) return;

		const handleWheel = (e: WheelEvent) => {
			if (throttledRef.current) return;
			if (Math.abs(e.deltaY) < 5) return;
			e.preventDefault();

			throttledRef.current = true;
			if (e.deltaY > 0) setPageIndex((p) => Math.min(p + 1, totalPages - 1));
			else setPageIndex((p) => Math.max(p - 1, 0));

			if (timerRef.current) clearTimeout(timerRef.current);
			timerRef.current = window.setTimeout(
				() => (throttledRef.current = false),
				450
			);
		};

		container.addEventListener("wheel", handleWheel, { passive: false });
		return () => {
			container.removeEventListener("wheel", handleWheel);
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [isMobile, totalPages]);

	useEffect(() => {
		if (!isMobile) return;
		const container = containerRef.current;
		if (!container) return;

		let tStartX = 0;
		let tStartY = 0;
		let tEndX = 0;
		let tEndY = 0;

		const handleTouchStart = (e: TouchEvent) => {
			const t = e.touches[0];
			tStartX = t.clientX;
			tStartY = t.clientY;
			tEndX = t.clientX;
			tEndY = t.clientY;
		};

		const handleTouchMove = (e: TouchEvent) => {
			const t = e.touches[0];
			tEndX = t.clientX;
			tEndY = t.clientY;
		};

		const handleTouchEnd = () => {
			if (throttledRef.current) return;
			const diffX = tStartX - tEndX;
			const diffY = Math.abs(tStartY - tEndY);
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

		container.addEventListener("touchstart", handleTouchStart, {
			passive: true,
		});
		container.addEventListener("touchmove", handleTouchMove, { passive: true });
		container.addEventListener("touchend", handleTouchEnd, { passive: true });

		return () => {
			container.removeEventListener("touchstart", handleTouchStart);
			container.removeEventListener("touchmove", handleTouchMove);
			container.removeEventListener("touchend", handleTouchEnd);
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [isMobile, totalPages]);

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
		if (!images.length || totalPages === 0) return [];
		if (isMobile) return [images[Math.min(pageIndex, images.length - 1)]];
		const start = pageIndex * 2;
		const imgs = images.slice(start, start + 2);
		if (!isMobile && imgs.length === 1)
			imgs.push({ id: -1, url: "", alternativeText: null });
		return imgs;
	}, [images, pageIndex, isMobile, totalPages]);

	return (
		<div className="horizontalCarouselContainer" ref={containerRef}>
			<div className={`horizontalCarousel ${isMobile ? "mobile" : "desktop"}`}>
				{visibleImages.map((img) =>
					img.id === -1 ? (
						<div
							key="placeholder"
							className="horizontalCarouselPage placeholder"
						/>
					) : (
						<div key={img.id} className="horizontalCarouselPage">
							{!imageData[img.id]?.loaded && (
								<Skeleton className="horizontalCarouselSkeleton" />
							)}

							<img
								className={`horizontalCarouselImage ${
									imageData[img.id]?.loaded ? "visible" : "hidden"
								}`}
								src={img.url}
								alt={img.alternativeText || `Image ${img.id}`}
								onLoad={(e) => {
									const image = e.currentTarget;
									const orientation: Orientation =
										image.naturalWidth > image.naturalHeight
											? "horizontal"
											: "vertical";
									setImageData((prev) => ({
										...prev,
										[img.id]: { loaded: true, orientation },
									}));
								}}
							/>
						</div>
					)
				)}
			</div>

			{totalPages > 1 && (
				<div className="horizontalCarouselPageIndicatorsContainer">
					<div
						className="horizontalCarouselPageIndicatorsInner"
						ref={dotsRef}
						style={{ transform: `translateX(${transformX}px)` }}
					>
						{Array.from({ length: totalPages }).map((_, i) => (
							<button
								key={i}
								className={`horizontalCarouselDot ${
									i === pageIndex ? "active" : ""
								}`}
								onClick={() => setPageIndex(i)}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default HorizontalCarousel;
