"use client";

import React, { useEffect, useState } from "react";
import { banmConfig } from "~/data/banmConfig";

export default function FeatureCallouts() {
	const [activeFeature, setActiveFeature] = useState<string | null>(null);

	// Use Intersection Observer to detect which text block is active
	useEffect(() => {
		const blocks = document.querySelectorAll(".feature-block");
		
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveFeature(entry.target.getAttribute("data-id"));
					}
				});
			},
			{
				root: null,
				threshold: 0.5, // Trigger when 50% of the text block is in view
			}
		);

		blocks.forEach((block) => observer.observe(block));

		return () => observer.disconnect();
	}, []);

	// Optional: we can clear activeFeature when scrolling back up above the blocks.
	useEffect(() => {
		const handleScroll = () => {
			// If we scroll way up, clear it
			if (window.scrollY < window.innerHeight * 3) {
				setActiveFeature(null);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="absolute inset-0 pointer-events-none z-20">
			{/* LOCATE CALLOUTS - Dots and Pointers */}
			{banmConfig.locateCallouts.map((callout) => {
				const isActive = activeFeature === callout.id;
				const top = `${callout.y * 100}%`;
				const left = `${callout.x * 100}%`;

				return (
					<div
						key={callout.id}
						className={`absolute transition-all duration-700 pointer-events-none ${isActive ? "opacity-100" : "opacity-0"}`}
						style={{ top, left, transform: "translate(-50%, -50%)" }}
					>
						<div className="relative flex items-center justify-center">
							{/* Ping effect */}
							<div className={`absolute w-16 h-16 rounded-full border border-[var(--red)] ${isActive ? "animate-ping opacity-40" : "opacity-0"}`}></div>
							
							{/* Solid Core Dot */}
							<div className={`w-3 h-3 rounded-full bg-[var(--red)] shadow-[0_0_12px_var(--red)] transition-transform duration-500 ${isActive ? "scale-100" : "scale-0"}`}></div>

							{/* Leader Line (Desktop only) 
							   Points to the left where the text is.
							*/}
							<div className={`absolute right-full top-1/2 -translate-y-1/2 w-[30vw] h-px bg-gradient-to-r from-transparent via-[var(--red)] to-[var(--red)] origin-right transition-transform duration-700 ease-out hidden md:block ${isActive ? "scale-x-100 opacity-70" : "scale-x-0 opacity-0"}`}></div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
