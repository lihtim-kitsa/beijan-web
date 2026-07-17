"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import FrameSequenceCanvas from "~/components/banm/FrameSequenceCanvas";
import FeatureCallouts from "~/components/banm/FeatureCallouts";
import { CrosshairCursor } from "~/components/ui";

/* 
 * DESIGN PLAN SUMMARY
 * Colors: --dark, --dark2, --red, and --mono typography.
 * Fonts: --sans for large headings, --mono for tactical/spec readouts.
 * Signature Element: Frames 238-300 transition (X-ray casing reveal with locator crosshairs).
 * Layout: 
 *   - Section A (Hero): 100vh static HUD entry.
 *   - Section B (Sequence Scrub): 400vh tall sticky container driving the <canvas>.
 *   - Section C (Spec grid): Dense, minimal monospace table.
 *   - Section D (CTA): High contrast footer.
 * Mobile Strategy: Same 400vh scroll scrub, but callout positions adjusted for small screens.
 */

export default function BanmPage() {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const targetProgressRef = useRef(0);
	const currentProgressRef = useRef(0);

	// Smooth scroll interpolation (Lerp) for buttery animation OUTSIDE of React state
	useEffect(() => {
		let rafId: number;

		const updateProgress = () => {
			// Ease factor (lower = smoother but slower to catch up)
			const ease = 0.08;

			// If we're not at the target, interpolate
			if (Math.abs(targetProgressRef.current - currentProgressRef.current) > 0.0005) {
				currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * ease;
				window.dispatchEvent(new CustomEvent("banm-scroll", { detail: currentProgressRef.current }));
				const pb = document.getElementById("banm-progress-bar");
				if (pb) pb.style.height = `${currentProgressRef.current * 100}%`;
			} else if (currentProgressRef.current !== targetProgressRef.current) {
				// Snap when extremely close
				currentProgressRef.current = targetProgressRef.current;
				window.dispatchEvent(new CustomEvent("banm-scroll", { detail: currentProgressRef.current }));
				const pb = document.getElementById("banm-progress-bar");
				if (pb) pb.style.height = `${currentProgressRef.current * 100}%`;
			}

			rafId = requestAnimationFrame(updateProgress);
		};

		rafId = requestAnimationFrame(updateProgress);

		const handleScroll = () => {
			if (scrollContainerRef.current) {
				const rect = scrollContainerRef.current.getBoundingClientRect();
				// Only calculate when container is partially in view
				if (rect.top <= window.innerHeight && rect.bottom >= 0) {
					const scrollableHeight = rect.height - window.innerHeight;
					let p = -rect.top / scrollableHeight;
					targetProgressRef.current = Math.max(0, Math.min(1, p));
				}
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll(); // initialize

		return () => {
			window.removeEventListener("scroll", handleScroll);
			cancelAnimationFrame(rafId);
		};
	}, []);

	return (
		<main className="bg-[#0b0b0b] text-white min-h-screen selection:bg-[var(--red)] selection:text-white">
			<CrosshairCursor />

			{/* NAVBAR (Minimal HUD Style) */}
			<nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference pointer-events-none">
				<Link
					href="/"
					className="font-sans font-bold text-sm tracking-[0.15em] uppercase flex items-center gap-2 pointer-events-auto hover:text-[var(--red)] transition-colors"
				>
					<img src="/beijan-logo-white.png" alt="Logo" className="w-6 h-6 opacity-90" />
					BEIJAN
				</Link>

				<div className="hidden lg:flex flex-row items-center gap-10 font-mono text-xs tracking-[0.15em] uppercase pointer-events-auto">
					<a href="/banm" className="text-[var(--red)] border-b border-[var(--red)] pb-1">BANM</a>
					<a href="/careers" className="text-white/60 hover:text-[var(--red)] transition-colors">CAREERS</a>
				</div>

				<Link
					href="/careers"
					className="font-mono text-xs tracking-widest pointer-events-auto hover:text-[var(--red)] transition-colors uppercase border border-white/20 px-4 py-2 bg-black/50 backdrop-blur-sm"
				>
					[ JOIN US ]
				</Link>
			</nav>

			{/* SECTION A: HERO */}
			<section className="relative w-full h-screen flex flex-col justify-end p-8 md:p-16 border-b border-white/10 z-10 bg-gradient-to-t from-black/80 to-transparent">
				{/* Background ambient static shot could go here, or we let the canvas handle it since it sticks */}
				<div className="absolute inset-0 z-[-1] opacity-50" style={{
					backgroundImage: "url('/banm-frames/beijan render webp/0001.webp')",
					backgroundSize: "cover",
					backgroundPosition: "center"
				}}></div>

				<div className="max-w-4xl z-10">
					<div className="flex items-center gap-3 mb-6">
						<div className="w-2 h-2 rounded-full bg-[var(--red)] animate-pulse"></div>
						<div className="font-mono text-[var(--red)] tracking-widest text-xs font-bold border border-[var(--red)]/30 px-2 py-1 bg-[var(--red)]/10">
							SYS-01 // DEPLOYABLE
						</div>
					</div>
					<h1 className="font-sans text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-4 leading-none">
						BANM
					</h1>
					<p className="font-mono text-white/70 text-sm md:text-base max-w-lg tracking-wide leading-relaxed">
						Autonomous navigation module for contested airspace.
						Transforming Group 3-5 platforms into collaborative kinetic assets.
					</p>
				</div>

				{/* Scroll indicator HUD */}
				<div className="absolute bottom-8 right-8 flex flex-col items-center gap-4">
					<div className="font-mono text-[10px] tracking-widest text-white/50 rotate-90 origin-right whitespace-nowrap mb-8">
						SCROLL TO INITIALIZE
					</div>
					<div className="w-px h-16 bg-gradient-to-b from-[var(--red)] to-transparent"></div>
				</div>
			</section>

			{/* SECTION B: SCROLL-DRIVEN SEQUENCE */}
			<section
				ref={scrollContainerRef}
				className="relative w-full"
				style={{ height: "900vh" }} // 9x viewport height (4x for animation, 5x for features & spacer)
			>
				<div className="sticky top-0 w-full h-screen overflow-hidden bg-[#0b0b0b]">
					{/* Grid Overlay Texture */}
					<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-10"></div>

					{/* The Canvas */}
					<FrameSequenceCanvas />

					{/* Global progress bar */}
					<div className="absolute top-24 right-8 w-1 h-32 bg-white/10 z-20 rounded-full hidden md:block">
						<div
							className="w-full bg-[var(--red)] rounded-full transition-all duration-75"
							id="banm-progress-bar"
						></div>
					</div>
				</div>

				{/* SCROLLING FEATURE BLOCKS (Native Scroll over the sticky canvas) */}
				<div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
					{/* Spacer to push text down to the second half of the scroll (after animation finishes at 400vh) */}
					<div style={{ height: "400vh" }}></div>

					{/* Feature 1 */}
					<div className="h-screen flex flex-col justify-end md:justify-center pb-32 md:pb-0 px-8 md:px-24 max-w-2xl pointer-events-auto feature-block" data-id="loc-1">
						<h3 className="font-mono text-sm tracking-[0.2em] text-[var(--red)] mb-3 md:mb-4 uppercase">STATE 01</h3>
						<h2 className="font-sans text-4xl md:text-7xl font-bold uppercase mb-4 md:mb-6 leading-none">GPS NOMINAL</h2>
						<p className="font-sans text-base md:text-lg text-white/70 leading-relaxed max-w-lg">
							Drone flies its planned mission normally. BANM observes and builds a continuous visual track.
						</p>
					</div>

					{/* Feature 2 */}
					<div className="h-screen flex flex-col justify-end md:justify-center pb-32 md:pb-0 px-8 md:px-24 max-w-2xl pointer-events-auto feature-block" data-id="loc-2">
						<h3 className="font-mono text-sm tracking-[0.2em] text-[var(--red)] mb-3 md:mb-4 uppercase">STATE 02</h3>
						<h2 className="font-sans text-4xl md:text-7xl font-bold uppercase mb-4 md:mb-6 leading-none">GPS JAMMED</h2>
						<p className="font-sans text-base md:text-lg text-white/70 leading-relaxed max-w-lg">
							Signal is lost or spoofed. Instead of failing, BANM takes over as the position source.
						</p>
					</div>

					{/* Feature 3 */}
					<div className="h-screen flex flex-col justify-end md:justify-center pb-32 md:pb-0 px-8 md:px-24 max-w-2xl pointer-events-auto feature-block" data-id="loc-3">
						<h3 className="font-mono text-sm tracking-[0.2em] text-[var(--red)] mb-3 md:mb-4 uppercase">STATE 03</h3>
						<h2 className="font-sans text-4xl md:text-7xl font-bold uppercase mb-4 md:mb-6 leading-none">DEAD RECKONING</h2>
						<p className="font-sans text-base md:text-lg text-white/70 leading-relaxed max-w-lg">
							Its system estimates motion frame-to-frame, holding the aircraft on course — even in low light.
						</p>
					</div>

					{/* Feature 4 */}
					<div className="h-screen flex flex-col justify-end md:justify-center pb-32 md:pb-0 px-8 md:px-24 max-w-2xl pointer-events-auto feature-block" data-id="loc-4">
						<h3 className="font-mono text-sm tracking-[0.2em] text-[var(--red)] mb-3 md:mb-4 uppercase">STATE 04</h3>
						<h2 className="font-sans text-4xl md:text-7xl font-bold uppercase mb-4 md:mb-6 leading-none">GPS RESTORED</h2>
						<p className="font-sans text-base md:text-lg text-white/70 leading-relaxed max-w-lg">
							Signal returns and BANM hands back seamlessly. The mission resumes without operator input.
						</p>
					</div>

					{/* Spacer at the end so the last feature stays on screen before entering the next section */}
					<div style={{ height: "100vh" }}></div>
				</div>
			</section>

			{/* SECTION VARIANTS: CONFIGURATIONS */}
			<section className="bg-[#0b0b0b] text-white border-t border-white/10" id="variants">
				<div className="w-full px-6 md:px-24 lg:px-32 xl:px-48">
					<div className="flex justify-center text-center pt-24 md:pt-32 pb-10">
						<div className="section-eyebrow">
							CONFIGURATIONS — THREE VARIANTS
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
						{/* VAR 01 */}
						<div className="bg-[#f0ece5] text-[#1a1a1a] flex flex-col p-6 md:p-10 h-full" style={{ clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)" }}>
							<div className="flex justify-center items-center text-center">
								<h3 className="font-sans text-[22px] md:text-[28px] font-semibold tracking-tight">VAR01: Dead Reckoning</h3>
							</div>

							<div className="flex-1 flex flex-col justify-center items-center py-12 md:py-16">
								<img src="/banm-var1.png" alt="VAR 01" className="w-full max-w-[200px] md:max-w-[260px] object-contain mix-blend-multiply drop-shadow-sm hover:scale-105 transition-transform duration-500" />
							</div>

							<div className="mt-auto space-y-0 text-center">
								<div className="border-t border-black/20 pt-3 pb-5">
									<div className="font-sans text-[10px] font-bold uppercase tracking-wide text-black/80 mb-[2px]">SURVIVAL</div>
									<div className="font-sans text-sm text-black/60 leading-tight">Dead-reckoning Navigation</div>
								</div>
								<div className="border-t border-black/20 pt-3 pb-5">
									<div className="font-sans text-[10px] font-bold uppercase tracking-wide text-black/80 mb-[2px]">HANDOFF</div>
									<div className="font-sans text-sm text-black/60 leading-tight">Seamless GPS Handoff</div>
								</div>
								<div className="border-t border-black/20 pt-3 pb-5 border-b">
									<div className="font-sans text-[10px] font-bold uppercase tracking-wide text-black/80 mb-[2px]">STORAGE</div>
									<div className="font-sans text-sm text-black/60 leading-tight">Flight Video + Telemetry Recordings</div>
								</div>
							</div>
						</div>

						{/* VAR 02 */}
						<div className="bg-[#f0ece5] text-[#1a1a1a] flex flex-col p-6 md:p-10 h-full" style={{ clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)" }}>
							<div className="flex justify-center items-center text-center">
								<h3 className="font-sans text-[22px] md:text-[28px] font-semibold tracking-tight">VAR02: DR + Map Matching</h3>
							</div>

							<div className="flex-1 flex flex-col justify-center items-center py-12 md:py-16">
								<img src="/banm-var2.png" alt="VAR 02" className="w-full max-w-[200px] md:max-w-[260px] object-contain mix-blend-multiply drop-shadow-sm hover:scale-105 transition-transform duration-500" />
							</div>

							<div className="mt-auto space-y-0 text-center">
								<div className="border-t border-black/20 pt-3 pb-5">
									<div className="font-sans text-[10px] font-bold uppercase tracking-wide text-black/80 mb-[2px]">BASE</div>
									<div className="font-sans text-sm text-black/60 leading-tight">All Var 01 Capabilities</div>
								</div>
								<div className="border-t border-black/20 pt-3 pb-5">
									<div className="font-sans text-[10px] font-bold uppercase tracking-wide text-black/80 mb-[2px]">CORRECTION</div>
									<div className="font-sans text-sm text-black/60 leading-tight">Offline Satellite Map Matching</div>
								</div>
								<div className="border-t border-black/20 pt-3 pb-5 border-b">
									<div className="font-sans text-[10px] font-bold uppercase tracking-wide text-black/80 mb-[2px]">POSITION FIX</div>
									<div className="font-sans text-sm text-black/60 leading-tight">Absolute Position & Drift Fix</div>
								</div>
							</div>
						</div>

						{/* VAR 03 */}
						<div className="bg-[#f0ece5] text-[#1a1a1a] flex flex-col p-6 md:p-10 h-full" style={{ clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)" }}>
							<div className="flex justify-center items-center text-center">
								<h3 className="font-sans text-[22px] md:text-[28px] font-semibold tracking-tight">VAR03: Autonomous + AI</h3>
							</div>

							<div className="flex-1 flex flex-col justify-center items-center py-12 md:py-16">
								<img src="/banm-var3.png" alt="VAR 03" className="w-full max-w-[200px] md:max-w-[260px] object-contain mix-blend-multiply drop-shadow-sm hover:scale-105 transition-transform duration-500" />
							</div>

							<div className="mt-auto space-y-0 text-center">
								<div className="border-t border-black/20 pt-3 pb-5">
									<div className="font-sans text-[10px] font-bold uppercase tracking-wide text-black/80 mb-[2px]">BASE</div>
									<div className="font-sans text-sm text-black/60 leading-tight">All Var 02 Capabilities</div>
								</div>
								<div className="border-t border-black/20 pt-3 pb-5">
									<div className="font-sans text-[10px] font-bold uppercase tracking-wide text-black/80 mb-[2px]">MISSIONS</div>
									<div className="font-sans text-sm text-black/60 leading-tight">Autonomous Smart Missions</div>
								</div>
								<div className="border-t border-black/20 pt-3 pb-5 border-b">
									<div className="font-sans text-[10px] font-bold uppercase tracking-wide text-black/80 mb-[2px]">TRACKING</div>
									<div className="font-sans text-sm text-black/60 leading-tight">AI Target Tracking</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>


			{/* SECTION D: CTA */}
			<section className="bg-[#121212] text-white border-t border-white/10" id="contact">
				<div className="pt-24 md:pt-[120px] px-8 md:px-10">
					<div className="section-eyebrow">
						CONTACT
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2">
					<div className="p-10 md:p-20">
						<h2 className="font-sans text-4xl md:text-6xl font-bold uppercase mb-6 tracking-tighter text-white">
							Ready to integrate?
						</h2>
						<p className="font-sans text-white/60 text-lg max-w-sm">
							BANM units are currently available for defense and authorized
							government contractors. Contact our integrations team to secure a
							deployment allocation.
						</p>
					</div>
					<div className="p-10 md:p-20 flex flex-col justify-end">
						<a className="font-sans text-2xl md:text-3xl font-bold hover:text-[var(--red)] transition-colors text-white" href="mailto:hello@beijantech.com">
							TEAM@BEIJANTECH.COM →
						</a>
						<p className="font-mono text-[9px] text-white/30 tracking-[0.1em] mt-4 uppercase">
							[ CLASSIFIED: UNRESTRICTED ]
						</p>
					</div>
				</div>

				<div className="flex flex-col md:flex-row justify-between items-start md:items-end p-10 md:p-20 border-t border-white/10">
					<div>
						<div className="font-sans text-2xl font-bold tracking-tighter text-white mb-2">BEIJAN</div>
						<div className="font-sans text-white/50 text-sm">Giving every machine a brain.</div>
					</div>
					<div className="mt-8 md:mt-0 flex flex-col items-start md:items-end gap-2">
						<a className="font-mono text-[10px] tracking-widest uppercase hover:text-[var(--red)] transition-colors text-white/50" href="#">
							↑ BACK TO TOP
						</a>
						<div className="font-mono text-[10px] tracking-widest uppercase text-white/30">
							© 2026 Beijan Technologies. All rights reserved.
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
