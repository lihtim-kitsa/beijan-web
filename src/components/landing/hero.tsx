"use client";

import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import * as React from "react";
import { TargetingReticle } from "./targeting-reticle";

gsap.registerPlugin(TextPlugin);

/** Characters used during the scramble decode effect */
const SCRAMBLE_CHARS =
	"█▓░▒╬╠╣╦╩─│┌┐└┘◆◇○●∎ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Lightweight text-scramble hook.
 * Resolves each character one-by-one from random glyphs to the target string.
 */
function useTextScramble(
	target: string,
	options?: { delay?: number; duration?: number },
) {
	const [display, setDisplay] = React.useState("");
	const hasRun = React.useRef(false);

	React.useEffect(() => {
		if (hasRun.current) return;
		hasRun.current = true;

		const delay = options?.delay ?? 0;
		const duration = options?.duration ?? 1.8;
		const length = target.length;

		// Start with random chars
		const chars = Array.from(
			{ length },
			() => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
		);
		setDisplay(chars.join(""));

		const timeoutId = setTimeout(() => {
			let resolved = 0;
			const perChar = (duration * 1000) / length;

			const interval = setInterval(() => {
				// Scramble unresolved chars
				for (let i = resolved; i < length; i++) {
					if (target[i] === " ") {
						chars[i] = " ";
					} else {
						chars[i] =
							SCRAMBLE_CHARS[
								Math.floor(Math.random() * SCRAMBLE_CHARS.length)
							] ?? "X";
					}
				}
				// Resolve next char
				chars[resolved] = target[resolved] ?? "";
				resolved++;
				setDisplay(chars.join(""));

				if (resolved >= length) {
					clearInterval(interval);
					setDisplay(target);
				}
			}, perChar);

			return () => clearInterval(interval);
		}, delay);

		return () => clearTimeout(timeoutId);
	}, [target, options?.delay, options?.duration]);

	return display;
}

export function Hero() {
	const line1 = useTextScramble("BEIJAN", { delay: 150, duration: 0.8 });
	const line2 = useTextScramble("TECH", { delay: 350, duration: 0.6 });
	const [showSubtitle, setShowSubtitle] = React.useState(false);
	const scanRef = React.useRef<HTMLDivElement>(null);

	// Show subtitle after scramble finishes
	React.useEffect(() => {
		const timer = setTimeout(() => setShowSubtitle(true), 1200);
		return () => clearTimeout(timer);
	}, []);

	return (
		<section
			className="relative flex min-h-screen w-full items-center justify-start overflow-hidden"
			id="hero"
			style={{ backgroundColor: "var(--color-background)" }}
		>
			{/* Scan-line overlay */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 z-10"
				ref={scanRef}
				style={{
					height: "1px",
					top: 0,
					background:
						"linear-gradient(90deg, transparent 0%, var(--color-accent) 20%, var(--color-accent) 80%, transparent 100%)",
					opacity: 0.4,
					animation: "scanline 2.5s ease-in-out infinite",
				}}
			/>

			{/* SVG noise static texture */}
			<svg
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 h-0 w-0"
			>
				<filter id="noise">
					<feTurbulence
						baseFrequency="0.65"
						numOctaves="3"
						stitchTiles="stitch"
						type="fractalNoise"
					/>
				</filter>
			</svg>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0"
				style={{
					filter: "url(#noise)",
					opacity: 0.09,
					mixBlendMode: "multiply",
				}}
			/>

			{/* Dot grid background */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0"
				style={{
					backgroundImage:
						"radial-gradient(circle, var(--color-muted) 1.2px, transparent 1.2px)",
					backgroundSize: "24px 24px",
					opacity: 0.4,
				}}
			/>

			{/* Main content — flex: text left, reticle right */}
			<div className="relative z-20 flex w-full items-center justify-between px-8 md:px-16 lg:px-24">
				{/* Left: text content */}
				<div className="flex-shrink-0">
					<h1
						className="select-none font-bold leading-[0.9] tracking-tighter"
						style={{
							color: "var(--color-accent)",
							fontSize: "clamp(4rem, 15vw, 14rem)",
							fontFeatureSettings: "'ss01' on, 'ss02' on",
						}}
					>
						<span
							className="block"
							style={{
								animation: "glitch-flicker 3s ease-in-out infinite",
								minHeight: "1em",
							}}
						>
							{line1}
						</span>
						<span
							className="block"
							style={{
								animation: "glitch-flicker 3s ease-in-out 0.3s infinite",
								minHeight: "1em",
							}}
						>
							{line2}
						</span>
					</h1>

					{/* Subtitle */}
					<p
						className="mt-6 font-medium uppercase md:mt-8"
						style={{
							color: "var(--color-foreground)",
							fontSize: "clamp(0.75rem, 1.5vw, 1.125rem)",
							letterSpacing: "0.2em",
							opacity: showSubtitle ? 1 : 0,
							transform: showSubtitle ? "translateY(0)" : "translateY(12px)",
							transition: "opacity 0.8s ease, transform 0.8s ease",
						}}
					>
						Giving every machine a brain.
					</p>
				</div>

				{/* Right: targeting reticle */}
				<div
					aria-hidden="true"
					className="pointer-events-none hidden flex-shrink-0 lg:block"
				>
					<TargetingReticle />
				</div>
			</div>
		</section>
	);
}
