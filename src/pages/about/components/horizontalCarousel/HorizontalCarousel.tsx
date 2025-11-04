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
	const [isMobile, setIsMobile] = useState(
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

	// Utility to lock/unlock body scroll
	const lockBodyScroll = () => {
		document.body.style.overflow = "hidden";
	};
	const unlockBodyScroll = () => {
		document.body.style.overflow = "";
	};

	// Desktop wheel control
	useEffect(() => {
		const container = containerRef.current;
		if (!container || isMobile) return;

		const handleWheel = (e: WheelEvent) => {
			if (!hovered) return;

			const delta = e.deltaY;
			if (Math.abs(delta) < 5) return;

			const atFirst = pageIndex === 0;
			const atLast = pageIndex === totalPages - 1;

			// If scrolling within carousel range, lock body scroll
			if ((delta > 0 && !atLast) || (delta < 0 && !atFirst)) {
				e.preventDefault();
				e.stopPropagation();
				lockBodyScroll();
			} else {
				// If at the edges, unlock body scroll
				unlockBodyScroll();
				return;
			}

			if (throttledRef.current) return;
			throttledRef.current = true;

			setPageIndex((prev) => {
				if (delta > 0) return Math.min(prev + 1, totalPages - 1);
				return Math.max(prev - 1, 0);
			});

			clearTimeout(timerRef.current);
			timerRef.current = window.setTimeout(() => {
				throttledRef.current = false;
			}, 400);
		};

		container.addEventListener("wheel", handleWheel, { passive: false });
		return () => {
			container.removeEventListener("wheel", handleWheel);
			unlockBodyScroll();
		};
	}, [hovered, isMobile, totalPages, pageIndex]);

	// Mobile swipe control
	useEffect(() => {
		const el = containerRef.current;
		if (!el || !isMobile) return;

		let activePointerId: number | undefined;
		let startX = 0;
		let startY = 0;
		let isDragging = false;
		let isHorizontal = false;
		let directionLocked: "x" | "y" | null = null;
		const RESET_LOCK_AFTER = 8;

		const onPointerDown = (e: PointerEvent) => {
			if (e.pointerType !== "touch") return;
			activePointerId = e.pointerId;
			startX = e.clientX;
			startY = e.clientY;
			isDragging = true;
			isHorizontal = false;
			directionLocked = null;
		};

		const onPointerMove = (e: PointerEvent) => {
			if (!isDragging || e.pointerId !== activePointerId) return;
			const dx = e.clientX - startX;
			const dy = e.clientY - startY;

			if (!directionLocked) {
				if (
					Math.abs(dx) >= RESET_LOCK_AFTER ||
					Math.abs(dy) >= RESET_LOCK_AFTER
				) {
					directionLocked = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
					isHorizontal = directionLocked === "x";
				}
			}
		};

		const onPointerUp = (e: PointerEvent) => {
			if (!isDragging || e.pointerId !== activePointerId) return;
			const dx = e.clientX - startX;
			const adx = Math.abs(dx);

			isDragging = false;
			directionLocked = null;
			activePointerId = undefined;

			if (!isHorizontal) return;
			if (adx < 50) return;
			if (throttledRef.current) return;

			throttledRef.current = true;
			if (dx < 0) setPageIndex((p) => Math.min(p + 1, totalPages - 1));
			else setPageIndex((p) => Math.max(p - 1, 0));

			clearTimeout(timerRef.current);
			timerRef.current = window.setTimeout(() => {
				throttledRef.current = false;
			}, 450);
		};

		const onPointerCancel = () => {
			isDragging = false;
			directionLocked = null;
			activePointerId = undefined;
		};

		el.addEventListener("pointerdown", onPointerDown, { passive: true });
		el.addEventListener("pointermove", onPointerMove, { passive: true });
		el.addEventListener("pointerup", onPointerUp, { passive: true });
		el.addEventListener("pointercancel", onPointerCancel, { passive: true });
		el.addEventListener("pointerleave", onPointerCancel, { passive: true });

		return () => {
			el.removeEventListener("pointerdown", onPointerDown);
			el.removeEventListener("pointermove", onPointerMove);
			el.removeEventListener("pointerup", onPointerUp);
			el.removeEventListener("pointercancel", onPointerCancel);
			el.removeEventListener("pointerleave", onPointerCancel);
		};
	}, [isMobile, totalPages]);

	// Dots positioning
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
			onMouseLeave={() => {
				setHovered(false);
				// return scroll control to body
				document.body.style.overflow = "";
			}}
			style={
				isMobile ? ({ touchAction: "pan-y" } as React.CSSProperties) : undefined
			}
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
							<Skeleton
								className={`horizontalCarouselSkeleton ${
									imageData[img.id]?.loaded ? "hidden" : ""
								}`}
							/>
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
