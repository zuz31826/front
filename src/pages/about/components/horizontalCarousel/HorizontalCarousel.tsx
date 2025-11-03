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

	const [isMobile, setIsMobile] = useState(() =>
		typeof window !== "undefined" ? window.innerWidth < 768 : false
	);

	const [transformX, setTransformX] = useState(0);
	const [hovered, setHovered] = useState(false);

	const throttledRef = useRef(false);
	const timerRef = useRef<number | undefined>(undefined);
	const dotsRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const onResize = () => setIsMobile(window.innerWidth < 768);
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	const totalPages = useMemo(() => {
		if (!images.length) return 0;
		return Math.ceil(images.length / (isMobile ? 1 : 2));
	}, [images.length, isMobile]);

	// 💻 Prevent page scroll when hovering carousel
	useEffect(() => {
		if (isMobile) return;

		const preventScroll = (e: WheelEvent) => {
			if (hovered) {
				e.preventDefault();
				e.stopPropagation();
			}
		};

		window.addEventListener("wheel", preventScroll, { passive: false });
		return () => window.removeEventListener("wheel", preventScroll);
	}, [hovered, isMobile]);

	// 💻 Desktop scroll handling (wheel)
	useEffect(() => {
		const container = containerRef.current;
		if (!container || isMobile) return;

		const handleWheel = (e: WheelEvent) => {
			if (!hovered) return;
			if (Math.abs(e.deltaY) < 5) return;

			e.preventDefault();
			e.stopPropagation();

			if (throttledRef.current) return;
			throttledRef.current = true;

			if (e.deltaY > 0) setPageIndex((p) => Math.min(p + 1, totalPages - 1));
			else setPageIndex((p) => Math.max(p - 1, 0));

			clearTimeout(timerRef.current);
			timerRef.current = window.setTimeout(() => {
				throttledRef.current = false;
			}, 400);
		};

		container.addEventListener("wheel", handleWheel, { passive: false });
		return () => container.removeEventListener("wheel", handleWheel);
	}, [hovered, isMobile, totalPages]);

	// 📱 Mobile swipe handling
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

		const handleTouchEnd = (e: TouchEvent) => {
			const diffX = tStartX - tEndX;
			const diffY = Math.abs(tStartY - tEndY);

			// если свайп вертикальный — даём странице скроллиться
			if (diffY > Math.abs(diffX)) return;

			// горизонтальный свайп → листаем
			e.preventDefault();
			if (Math.abs(diffX) < 50) return;
			if (throttledRef.current) return;

			throttledRef.current = true;

			if (diffX > 0) setPageIndex((p) => Math.min(p + 1, totalPages - 1));
			else setPageIndex((p) => Math.max(p - 1, 0));

			clearTimeout(timerRef.current);
			timerRef.current = window.setTimeout(() => {
				throttledRef.current = false;
			}, 450);
		};

		container.addEventListener("touchstart", handleTouchStart, {
			passive: true,
		});
		container.addEventListener("touchmove", handleTouchMove, { passive: true });
		container.addEventListener("touchend", handleTouchEnd, { passive: false });

		return () => {
			container.removeEventListener("touchstart", handleTouchStart);
			container.removeEventListener("touchmove", handleTouchMove);
			container.removeEventListener("touchend", handleTouchEnd);
		};
	}, [isMobile, totalPages]);

	// 🔹 Center dots logic
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
	}, [pageIndex, totalPages, isMobile]);

	// visible images
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
		<div
			className="horizontalCarouselContainer"
			ref={containerRef}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
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
