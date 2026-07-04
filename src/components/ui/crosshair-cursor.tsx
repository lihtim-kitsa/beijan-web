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
			ref={cursorRef}
			aria-hidden="true"
			className="pointer-events-none fixed z-[9999]"
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
				width={size}
				viewBox={`0 0 ${size} ${size}`}
				style={{
					position: "absolute",
					top: -half,
					left: -half,
					overflow: "visible",
				}}
			>
				{/* Outer ring */}
				<circle
					cx={half}
					cy={half}
					r={14}
					fill="none"
					stroke={strokeColor}
					strokeWidth="1"
					opacity="0.5"
				/>

				{/* Top line */}
				<line
					x1={half} y1={0}
					x2={half} y2={half - gap}
					stroke={strokeColor}
					strokeWidth="1.5"
					opacity="0.9"
				/>
				{/* Bottom line */}
				<line
					x1={half} y1={half + gap}
					x2={half} y2={size}
					stroke={strokeColor}
					strokeWidth="1.5"
					opacity="0.9"
				/>
				{/* Left line */}
				<line
					x1={0} y1={half}
					x2={half - gap} y2={half}
					stroke={strokeColor}
					strokeWidth="1.5"
					opacity="0.9"
				/>
				{/* Right line */}
				<line
					x1={half + gap} y1={half}
					x2={size} y2={half}
					stroke={strokeColor}
					strokeWidth="1.5"
					opacity="0.9"
				/>

				{/* Center dot */}
				<circle
					cx={half}
					cy={half}
					r={1.5}
					fill={strokeColor}
					opacity="0.8"
				/>
			</svg>
		</div>
	);
}
