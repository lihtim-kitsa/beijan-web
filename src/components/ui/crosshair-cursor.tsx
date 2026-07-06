"use client";

import * as React from "react";

/**
 * A graphical crosshair cursor that follows the mouse.
 * Renders an SVG crosshair with tactical reticle styling.
 */
export function CrosshairCursor() {
	const cursorRef = React.useRef<HTMLDivElement>(null);
	const pos = React.useRef({ x: -100, y: -100 });
	const raf = React.useRef<number>(0);

	React.useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			pos.current = { x: e.clientX, y: e.clientY };
		};

		const animate = () => {
			if (cursorRef.current) {
				cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
			}
			raf.current = requestAnimationFrame(animate);
		};

		window.addEventListener("mousemove", handleMouseMove, { passive: true });
		raf.current = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			cancelAnimationFrame(raf.current);
		};
	}, []);

	const size = 40;
	const half = size / 2;
	const gap = 6; // gap around center
	const strokeColor = "var(--color-accent)";

	return (
		<div
			aria-hidden="true"
			className="pointer-events-none fixed z-[9999]"
			ref={cursorRef}
			style={{
				top: 0,
				left: 0,
				width: 0,
				height: 0,
				willChange: "transform",
			}}
		>
			<svg
				className="pointer-events-none"
				height={size}
				style={{
					position: "absolute",
					top: -half,
					left: -half,
					overflow: "visible",
				}}
				viewBox={`0 0 ${size} ${size}`}
				width={size}
			>
				{/* Outer ring */}
				<circle
					cx={half}
					cy={half}
					fill="none"
					opacity="0.5"
					r={14}
					stroke={strokeColor}
					strokeWidth="1"
				/>

				{/* Top line */}
				<line
					opacity="0.9"
					stroke={strokeColor}
					strokeWidth="1.5"
					x1={half}
					x2={half}
					y1={0}
					y2={half - gap}
				/>
				{/* Bottom line */}
				<line
					opacity="0.9"
					stroke={strokeColor}
					strokeWidth="1.5"
					x1={half}
					x2={half}
					y1={half + gap}
					y2={size}
				/>
				{/* Left line */}
				<line
					opacity="0.9"
					stroke={strokeColor}
					strokeWidth="1.5"
					x1={0}
					x2={half - gap}
					y1={half}
					y2={half}
				/>
				{/* Right line */}
				<line
					opacity="0.9"
					stroke={strokeColor}
					strokeWidth="1.5"
					x1={half + gap}
					x2={size}
					y1={half}
					y2={half}
				/>

				{/* Center dot */}
				<circle cx={half} cy={half} fill={strokeColor} opacity="0.8" r={1.5} />
			</svg>
		</div>
	);
}
