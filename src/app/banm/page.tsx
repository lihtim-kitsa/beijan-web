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
					<img src="/beijan-logo.png" alt="Logo" className="w-6 h-6 invert opacity-90" />
					BEIJAN TECH
				</Link>
				<div className="font-mono text-[10px] md:text-xs tracking-widest uppercase text-white/50 hidden md:block">
					SYS-01 // BANM
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
				style={{ height: "400vh" }} // 4x viewport height for smooth scrubbing
			>
				<div className="sticky top-0 w-full h-screen overflow-hidden bg-[#0b0b0b]">
					{/* Grid Overlay Texture */}
					<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-10"></div>
					
					{/* The Canvas */}
					<FrameSequenceCanvas />
					
					{/* Callouts (Data overlays) */}
					<FeatureCallouts />

					{/* Global progress bar */}
					<div className="absolute top-24 right-8 w-1 h-32 bg-white/10 z-20 rounded-full hidden md:block">
						<div 
							className="w-full bg-[var(--red)] rounded-full transition-all duration-75"
							id="banm-progress-bar"
						></div>
					</div>
				</div>
			</section>

			{/* SECTION C: SPEC SHEET */}
			<section className="bg-[#0b0b0b] text-white border-t border-white/10" id="specs">
				<div className="max-w-7xl mx-auto px-8 md:px-16 w-full">
					<div style={{ padding: "120px 0 40px" }}>
						<div className="section-eyebrow">
							TECHNICAL SPECIFICATIONS
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-x border-white/10 mb-32">
						{/* Block 1 */}
						<div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
							<div className="font-mono text-[var(--red)] text-[10px] font-bold tracking-widest mb-10 uppercase">
								Physical
							</div>
							<div className="space-y-6 font-mono text-xs">
								<div className="flex flex-col gap-1 border-b border-white/10 pb-3">
									<span className="opacity-40 uppercase tracking-widest text-[9px]">Weight</span>
									<span className="font-medium text-white/90">[SPEC] kg</span>
								</div>
								<div className="flex flex-col gap-1 border-b border-white/10 pb-3">
									<span className="opacity-40 uppercase tracking-widest text-[9px]">Dimensions</span>
									<span className="font-medium text-white/90">[SPEC] x [SPEC] mm</span>
								</div>
								<div className="flex flex-col gap-1 border-b border-white/10 pb-3">
									<span className="opacity-40 uppercase tracking-widest text-[9px]">Mounting</span>
									<span className="font-medium text-white/90">Standard NATO Rack</span>
								</div>
							</div>
						</div>

						{/* Block 2 */}
						<div className="p-8 md:p-12 border-b md:border-b-0 lg:border-r border-white/10 bg-white/[0.02]">
							<div className="font-mono text-[var(--red)] text-[10px] font-bold tracking-widest mb-10 uppercase">
								Compute & Nav
							</div>
							<div className="space-y-6 font-mono text-xs">
								<div className="flex flex-col gap-1 border-b border-white/10 pb-3">
									<span className="opacity-40 uppercase tracking-widest text-[9px]">Processing</span>
									<span className="font-medium text-white/90">40 TOPS NPU</span>
								</div>
								<div className="flex flex-col gap-1 border-b border-white/10 pb-3">
									<span className="opacity-40 uppercase tracking-widest text-[9px]">GNSS Denied</span>
									<span className="font-medium text-white/90">VIO + IMU fused</span>
								</div>
								<div className="flex flex-col gap-1 border-b border-white/10 pb-3">
									<span className="opacity-40 uppercase tracking-widest text-[9px]">Drift Rate</span>
									<span className="font-medium text-white/90">[SPEC] %</span>
								</div>
							</div>
						</div>

						{/* Block 3 */}
						<div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
							<div className="font-mono text-[var(--red)] text-[10px] font-bold tracking-widest mb-10 uppercase">
								Sensors
							</div>
							<div className="space-y-6 font-mono text-xs">
								<div className="flex flex-col gap-1 border-b border-white/10 pb-3">
									<span className="opacity-40 uppercase tracking-widest text-[9px]">EO/IR</span>
									<span className="font-medium text-white/90">4K / LWIR</span>
								</div>
								<div className="flex flex-col gap-1 border-b border-white/10 pb-3">
									<span className="opacity-40 uppercase tracking-widest text-[9px]">Rangefinder</span>
									<span className="font-medium text-white/90">[SPEC] km range</span>
								</div>
								<div className="flex flex-col gap-1 border-b border-white/10 pb-3">
									<span className="opacity-40 uppercase tracking-widest text-[9px]">Refresh Rate</span>
									<span className="font-medium text-white/90">60 Hz pipeline</span>
								</div>
							</div>
						</div>

						{/* Block 4 */}
						<div className="p-8 md:p-12 bg-white/[0.02]">
							<div className="font-mono text-[var(--red)] text-[10px] font-bold tracking-widest mb-10 uppercase">
								Environmental
							</div>
							<div className="space-y-6 font-mono text-xs">
								<div className="flex flex-col gap-1 border-b border-white/10 pb-3">
									<span className="opacity-40 uppercase tracking-widest text-[9px]">Operating Temp</span>
									<span className="font-medium text-white/90">-40°C to +60°C</span>
								</div>
								<div className="flex flex-col gap-1 border-b border-white/10 pb-3">
									<span className="opacity-40 uppercase tracking-widest text-[9px]">IP Rating</span>
									<span className="font-medium text-white/90">IP67 sealed</span>
								</div>
								<div className="flex flex-col gap-1 border-b border-white/10 pb-3">
									<span className="opacity-40 uppercase tracking-widest text-[9px]">EMI/EMC</span>
									<span className="font-medium text-white/90">MIL-STD-461G</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* SECTION D: CTA */}
			<section className="bg-[#121212] text-white border-t border-white/10" id="contact">
				<div style={{ padding: "120px 40px 0" }}>
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
