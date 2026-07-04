"use client";

import Lenis from "lenis";
import * as React from "react";

interface SmoothScrollProviderProps {
	children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
	React.useEffect(() => {
		const lenis = new Lenis({
			duration: 1.4, // Scroll duration (higher = smoother but slower)
			easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)), // Easing function
			orientation: "vertical",
			smoothWheel: true,
			touchMultiplier: 2,
		});

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
		};
	}, []);

	return <>{children}</>;
}
