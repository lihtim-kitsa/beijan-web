"use client";

import React, { useEffect, useRef } from "react";
import { banmConfig } from "~/data/banmConfig";

const TOTAL_FRAMES = banmConfig.totalFrames;

export default function FeatureCallouts() {
	const currentFrameRef = useRef(1);

	useEffect(() => {
		const handleScroll = (e: any) => {
			const p = e.detail;
			const currentFrame = Math.max(
				1,
				Math.min(TOTAL_FRAMES, Math.floor(p * TOTAL_FRAMES) + 1)
			);
			
			// Only update DOM when frame index changes
			if (currentFrameRef.current !== currentFrame) {
				currentFrameRef.current = currentFrame;
				
				// Update INFO callouts
				banmConfig.infoCallouts.forEach((callout) => {
					const el = document.getElementById(`info-callout-${callout.id}`);
					if (el) {
						const isActive = currentFrame >= callout.frameStart && currentFrame <= callout.frameEnd;
						if (isActive) {
							el.style.opacity = "1";
							el.style.transform = "translateY(0)";
						} else {
							el.style.opacity = "0";
							el.style.transform = "translateY(2rem)";
						}
					}
				});

				// Update LOCATE callouts
				banmConfig.locateCallouts.forEach((callout) => {
					const el = document.getElementById(`locate-callout-${callout.id}`);
					if (el) {
						const isActive = currentFrame >= callout.frameStart && currentFrame <= callout.frameEnd;
						if (isActive) {
							el.style.opacity = "1";
							el.style.pointerEvents = "auto";
						} else {
							el.style.opacity = "0";
							el.style.pointerEvents = "none";
						}
					}
				});
			}
		};

		// Initial check to show first frame callouts
		handleScroll({ detail: 0 });

		window.addEventListener("banm-scroll", handleScroll);
		return () => window.removeEventListener("banm-scroll", handleScroll);
	}, []);

	return (
		<div className="absolute inset-0 pointer-events-none z-20">
			{/* INFO CALLOUTS (Frames 1-237) */}
			{banmConfig.infoCallouts.map((callout) => (
				<div
					key={callout.id}
					id={`info-callout-${callout.id}`}
					className="absolute bottom-24 left-8 md:bottom-32 md:left-24 max-w-md transition-all duration-500 transform opacity-0 translate-y-8"
				>
					<h3 className="font-[var(--mono)] text-2xl font-bold tracking-widest text-white mb-4 uppercase">
						{callout.title}
					</h3>
					<p className="font-[var(--sans)] text-white/80 leading-relaxed text-base">
						{callout.description}
					</p>
				</div>
			))}

			{/* LOCATE CALLOUTS (Frames 238-300) */}
			{banmConfig.locateCallouts.map((callout) => {
				const top = `${callout.y * 100}%`;
				const left = `${callout.x * 100}%`;

				return (
					<div
						key={callout.id}
						id={`locate-callout-${callout.id}`}
						className="absolute transition-opacity duration-300 opacity-0 pointer-events-none"
						style={{ top, left, transform: "translate(-50%, -50%)" }}
					>
						<div className="relative flex items-center justify-center">
							{/* Ping effect */}
							<div className="absolute w-16 h-16 rounded-full border border-[var(--red)] opacity-40 animate-ping"></div>
							
							{/* Solid Core Dot */}
							<div className="w-2.5 h-2.5 rounded-full bg-[var(--red)] shadow-[0_0_12px_var(--red)]"></div>

							{/* Leader Line (Desktop only) */}
							<div className="absolute left-3 top-3 w-px h-16 bg-[var(--red)] opacity-50 origin-top-left -rotate-45 hidden md:block"></div>

							{/* Callout Box */}
							<div className="absolute top-12 left-12 md:left-[4.5rem] md:top-[4.5rem] w-max max-w-[280px] md:max-w-xs bg-[#0b0b0b]/90 backdrop-blur-md border border-[var(--red)]/30 p-4 rounded-sm shadow-2xl pointer-events-auto">
								<div className="flex items-center gap-2 mb-2">
									<div className="w-1.5 h-1.5 rounded-full bg-[var(--red)] animate-pulse"></div>
									<div className="font-[var(--mono)] text-[var(--red)] text-xs font-bold tracking-widest">
										{callout.label}
									</div>
								</div>
								<div className="font-[var(--sans)] text-white/90 text-sm leading-relaxed">
									{callout.description}
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
