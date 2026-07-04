"use client";

import * as React from "react";

/**
 * Animated tactical targeting reticle — pure SVG + CSS.
 * Designed for the hero right-side fill.
 */
export function TargetingReticle() {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		const t = setTimeout(() => setMounted(true), 400);
		return () => clearTimeout(t);
	}, []);

	const accent = "var(--color-accent)";
	const muted = "var(--color-muted)";
	const fg = "var(--color-foreground)";
	const size = 680;
	const cx = size / 2;
	const cy = size / 2;

	return (
		<div
			className="relative select-none"
			style={{
				width: size,
				height: size,
				opacity: mounted ? 1 : 0,
				transform: mounted ? "scale(1)" : "scale(0.92)",
				transition: "opacity 1.2s ease, transform 1.2s ease",
			}}
		>
			<svg
				className="block"
				viewBox={`0 0 ${size} ${size}`}
				width={size}
				height={size}
				fill="none"
			>
				{/* ── Outer ring — slow rotate ── */}
				<g style={{ transformOrigin: "50% 50%", animation: "reticle-spin 25s linear infinite" }}>
					<circle cx={cx} cy={cy} r={190} stroke={muted} strokeWidth="0.5" opacity="0.3" />
					{/* Tick marks on outer ring */}
					{Array.from({ length: 72 }).map((_, i) => {
						const angle = (i * 5 * Math.PI) / 180;
						const isMajor = i % 9 === 0;
						const r1 = isMajor ? 180 : 185;
						const r2 = 190;
						return (
							<line
								key={`ot-${i}`}
								x1={cx + r1 * Math.cos(angle)}
								y1={cy + r1 * Math.sin(angle)}
								x2={cx + r2 * Math.cos(angle)}
								y2={cy + r2 * Math.sin(angle)}
								stroke={isMajor ? fg : muted}
								strokeWidth={isMajor ? "1" : "0.5"}
								opacity={isMajor ? "0.4" : "0.2"}
							/>
						);
					})}
				</g>

				{/* ── Middle ring — counter rotate ── */}
				<g style={{ transformOrigin: "50% 50%", animation: "reticle-spin-reverse 18s linear infinite" }}>
					<circle cx={cx} cy={cy} r={140} stroke={accent} strokeWidth="0.5" opacity="0.25" strokeDasharray="4 8" />
					{/* Cardinal indicators */}
					{[0, 90, 180, 270].map((deg) => {
						const rad = (deg * Math.PI) / 180;
						return (
							<g key={`card-${deg}`}>
								<line
									x1={cx + 130 * Math.cos(rad)}
									y1={cy + 130 * Math.sin(rad)}
									x2={cx + 145 * Math.cos(rad)}
									y2={cy + 145 * Math.sin(rad)}
									stroke={accent}
									strokeWidth="1.5"
									opacity="0.5"
								/>
							</g>
						);
					})}
				</g>

				{/* ── Inner ring — static ── */}
				<circle cx={cx} cy={cy} r={90} stroke={fg} strokeWidth="0.5" opacity="0.15" />

				{/* ── Scanning arc ── */}
				<g style={{ transformOrigin: "50% 50%", animation: "reticle-spin 4s linear infinite" }}>
					<path
						d={`M ${cx} ${cy} L ${cx + 90} ${cy} A 90 90 0 0 1 ${cx + 90 * Math.cos(Math.PI / 6)} ${cy + 90 * Math.sin(Math.PI / 6)} Z`}
						fill={accent}
						opacity="0.06"
					/>
					<line
						x1={cx}
						y1={cy}
						x2={cx + 90}
						y2={cy}
						stroke={accent}
						strokeWidth="1"
						opacity="0.4"
					/>
				</g>

				{/* ── Center crosshair ── */}
				<line x1={cx - 20} y1={cy} x2={cx - 6} y2={cy} stroke={accent} strokeWidth="1" opacity="0.7" />
				<line x1={cx + 6} y1={cy} x2={cx + 20} y2={cy} stroke={accent} strokeWidth="1" opacity="0.7" />
				<line x1={cx} y1={cy - 20} x2={cx} y2={cy - 6} stroke={accent} strokeWidth="1" opacity="0.7" />
				<line x1={cx} y1={cy + 6} x2={cx} y2={cy + 20} stroke={accent} strokeWidth="1" opacity="0.7" />
				<circle cx={cx} cy={cy} r={2} fill={accent} opacity="0.6" />

				{/* ── Blip points ── */}
				<g style={{ animation: "reticle-pulse 2s ease-in-out infinite" }}>
					<circle cx={cx + 55} cy={cy - 40} r={3} fill={accent} opacity="0.7" />
					<circle cx={cx + 55} cy={cy - 40} r={8} stroke={accent} strokeWidth="0.5" opacity="0.3" />
				</g>
				<g style={{ animation: "reticle-pulse 2s ease-in-out 0.8s infinite" }}>
					<circle cx={cx - 30} cy={cy + 60} r={2.5} fill={accent} opacity="0.5" />
					<circle cx={cx - 30} cy={cy + 60} r={7} stroke={accent} strokeWidth="0.5" opacity="0.2" />
				</g>
				<g style={{ animation: "reticle-pulse 2s ease-in-out 1.4s infinite" }}>
					<circle cx={cx + 80} cy={cy + 25} r={2} fill={fg} opacity="0.3" />
				</g>

				{/* ── Corner brackets — HUD frame ── */}
				{/* Top-left */}
				<path d={`M ${cx - 155} ${cy - 140} L ${cx - 155} ${cy - 155} L ${cx - 140} ${cy - 155}`} stroke={fg} strokeWidth="0.8" opacity="0.2" fill="none" />
				{/* Top-right */}
				<path d={`M ${cx + 140} ${cy - 155} L ${cx + 155} ${cy - 155} L ${cx + 155} ${cy - 140}`} stroke={fg} strokeWidth="0.8" opacity="0.2" fill="none" />
				{/* Bottom-left */}
				<path d={`M ${cx - 155} ${cy + 140} L ${cx - 155} ${cy + 155} L ${cx - 140} ${cy + 155}`} stroke={fg} strokeWidth="0.8" opacity="0.2" fill="none" />
				{/* Bottom-right */}
				<path d={`M ${cx + 140} ${cy + 155} L ${cx + 155} ${cy + 155} L ${cx + 155} ${cy + 140}`} stroke={fg} strokeWidth="0.8" opacity="0.2" fill="none" />
			</svg>

			{/* ── Data readouts — positioned around the reticle ── */}
			<div
				className="absolute font-mono text-[10px] uppercase"
				style={{
					top: 32,
					right: 40,
					color: muted,
					opacity: 0.5,
					letterSpacing: "0.15em",
				}}
			>
				<span style={{ color: accent, opacity: 0.8 }}>TGT</span> LOCK
			</div>

			<div
				className="absolute font-mono text-[10px]"
				style={{
					bottom: 48,
					left: 40,
					color: muted,
					opacity: 0.4,
					letterSpacing: "0.1em",
				}}
			>
				34.0522°N 118.2437°W
			</div>

			<div
				className="absolute font-mono text-[10px] uppercase"
				style={{
					bottom: 32,
					right: 40,
					color: muted,
					opacity: 0.4,
					letterSpacing: "0.1em",
				}}
			>
				RNG 4.2km
			</div>

			{/* Inline keyframes for the SVG animations */}
			<style>{`
				@keyframes reticle-spin {
					from { transform: rotate(0deg); }
					to { transform: rotate(360deg); }
				}
				@keyframes reticle-spin-reverse {
					from { transform: rotate(360deg); }
					to { transform: rotate(0deg); }
				}
				@keyframes reticle-pulse {
					0%, 100% { opacity: 1; }
					50% { opacity: 0.3; }
				}
			`}</style>
		</div>
	);
}
