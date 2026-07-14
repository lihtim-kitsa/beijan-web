"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";

import type { GlobeMethods } from "react-globe.gl";

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export const locations = [
	{
		id: "hyderabad-hq",
		name: "Hyderabad HQ",
		type: "MAIN OFFICE + 4 BANM TESTING LOCATIONS",
		lat: 17.4239,
		lng: 78.4738,
		altitude: 0.5,
		status: "OPERATIONAL",
		telemetry: "MAIN OFFICE + 4 BANM TESTING LOCATIONS",
	},
	{
		id: "pokhran-test",
		name: "Pokhran",
		type: "BANM TESTING LOCATION",
		lat: 26.9218,
		lng: 71.9168,
		altitude: 0.5,
		status: "OPERATIONAL",
		telemetry: "TESTED AT 600M // SENSOR COMPLIANCE: SECURE",
	},
	{
		id: "leh-test",
		name: "Leh",
		type: "BANM TESTING LOCATION",
		lat: 34.1526,
		lng: 77.5771,
		altitude: 0.5,
		status: "OPERATIONAL",
		telemetry: "TESTED AT 600M // SENSOR COMPLIANCE: SECURE",
	},
];

export default function TacticalSection() {
	const globeRef = useRef<GlobeMethods | undefined>(undefined);
	const containerRef = useRef<HTMLDivElement>(null);
	const [activeLocationId, setActiveLocationId] = useState(locations[0]!.id);
	const [isMobile, setIsMobile] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
	const [indiaGeoJson, setIndiaGeoJson] = useState<any[]>([]);

	useEffect(() => {
		fetch("/india.geojson")
			.then((r) => r.json())
			.then((data) => {
				if (data && data.features) {
					setIndiaGeoJson(data.features);
				}
			})
			.catch((e) => console.error("Error fetching geojson", e));
	}, []);

	const globeLabels = useMemo(
		() => [
			{
				lat: 20.5937,
				lng: 78.9629,
				text: "INDIA",
				color: "rgba(255, 255, 255, 0.8)",
				size: 1.5,
			},
		],
		[],
	);

	useEffect(() => {
		const mqlMobile = window.matchMedia("(max-width: 768px)");
		const mqlMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

		setIsMobile(mqlMobile?.matches ?? false);
		setPrefersReducedMotion(mqlMotion?.matches ?? false);

		const mobileListener = (e: any) => setIsMobile(e.matches);
		const motionListener = (e: any) => setPrefersReducedMotion(e.matches);

		mqlMobile?.addEventListener("change", mobileListener);
		mqlMotion?.addEventListener("change", motionListener);

		return () => {
			mqlMobile?.removeEventListener("change", mobileListener);
			mqlMotion?.removeEventListener("change", motionListener);
		};
	}, []);

	// Render loop pausing when offscreen
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (globeRef.current && entry) {
					if (entry.isIntersecting) {
						globeRef.current.resumeAnimation();
					} else {
						globeRef.current.pauseAnimation();
					}
				}
			},
			{ threshold: 0 },
		);

		observer.observe(container);
		return () => observer.disconnect();
	}, []);

	// Initialize Globe view
	useEffect(() => {
		if (globeRef.current) {
			const loc = locations[0]!;
			globeRef.current.pointOfView(
				{ lat: loc.lat, lng: loc.lng, altitude: loc.altitude },
				0,
			);
			globeRef.current.controls().enableZoom = false;
		}
	}, []);

	// Desktop Scroll Scrubbing
	useEffect(() => {
		if (isMobile || prefersReducedMotion) return;

		const scrollContainer = document.getElementById(
			"tactical-scroll-container",
		);
		if (!scrollContainer) return;

		let rafPending = false;
		let lastIndex = 0;

		const onScroll = () => {
			const rect = scrollContainer.getBoundingClientRect();
			const viewportH = window.innerHeight;

			if (rect.bottom < 0 || rect.top > viewportH) return;

			const scrolled = -rect.top;
			const scrollableHeight = rect.height - viewportH;

			let ratio = scrolled / scrollableHeight;
			if (ratio < 0) ratio = 0;
			if (ratio > 0.999) ratio = 0.999;

			const newIndex = Math.floor(ratio * locations.length);

			if (
				newIndex !== lastIndex &&
				newIndex >= 0 &&
				newIndex < locations.length
			) {
				lastIndex = newIndex;
				const loc = locations[newIndex];
				if (loc) {
					setActiveLocationId(loc.id);

					if (globeRef.current) {
						globeRef.current.pointOfView(
							{ lat: loc.lat, lng: loc.lng, altitude: loc.altitude },
							800,
						);
					}
				}
			}
		};

		const handleScroll = () => {
			if (!rafPending) {
				rafPending = true;
				requestAnimationFrame(() => {
					onScroll();
					rafPending = false;
				});
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		onScroll();

		return () => window.removeEventListener("scroll", handleScroll);
	}, [isMobile, prefersReducedMotion]);

	// Mobile Discrete Scroll
	useEffect(() => {
		if (globeRef.current && typeof window !== "undefined") {
			try {
				const renderer = globeRef.current.renderer();
				if (renderer) {
					renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
				}
			} catch (e) { }
		}

		if (!isMobile || prefersReducedMotion) return;

		const triggers = document.querySelectorAll(".mobile-globe-trigger");
		if (triggers.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = parseInt(
							entry.target.getAttribute("data-index") || "0",
							10,
						);
						const loc = locations[index];
						if (loc) {
							setActiveLocationId(loc.id);
							if (globeRef.current) {
								globeRef.current.pointOfView(
									{ lat: loc.lat, lng: loc.lng, altitude: loc.altitude },
									1200,
								);
							}
						}
					}
				});
			},
			{ threshold: 0.5 },
		);

		triggers.forEach((t) => {
			observer.observe(t);
		});

		return () => observer.disconnect();
	}, [isMobile, prefersReducedMotion]);

	const activeLoc =
		locations.find((l) => l.id === activeLocationId) || locations[0]!;


	return (
		<div
			id="tactical-scroll-container"
			style={{ height: "300vh", position: "relative" }}
		>
			{/* Mobile Triggers - placed down the scroll container to trigger changes */}
			{isMobile &&
				locations.map((loc, i) => (
					<div
						className="mobile-globe-trigger"
						data-index={i}
						key={`trigger-${loc.id}`}
						style={{
							position: "absolute",
							top: `${(i / Math.max(1, locations.length - 1)) * 200 + 50}vh`,
							height: "1px",
							width: "100%",
						}}
					/>
				))}

			<section
				id="tactical"
				style={{
					position: "sticky",
					top: 0,
					height: "100vh",
					overflow: "hidden",
				}}
			>


				{/* RIGHT: Dark targeting map */}
				<div className="tac-right relative" ref={containerRef}>
					<div className="tac-scanline pointer-events-none absolute inset-0 z-10"></div>
					<div className="tac-right-grid pointer-events-none absolute inset-0 z-10"></div>

					{/* TOP LEFT TITLE */}
					<div className="pointer-events-none absolute left-4 top-28 md:left-12 md:top-28 z-20 select-none">
						<h2 className="font-bold font-[var(--mono)] text-3xl md:text-[3.5rem] md:leading-[1.1] text-white tracking-widest uppercase">
							Our Locations.
						</h2>
						<div className="text-[var(--red)] text-[10px] md:text-[13px] font-[var(--mono)] tracking-[0.2em] mt-3 md:mt-4">
							[01] AUTONOMY APPLICATIONS
						</div>
					</div>

					{prefersReducedMotion ? (
						<div className="flex h-full w-full flex-col items-center justify-center bg-[var(--dark2)] p-12">
							<h3 className="mb-4 font-[var(--mono)] font-bold text-white text-xl tracking-widest">
								{activeLoc.name}
							</h3>
							<p className="mb-2 font-[var(--mono)] text-[var(--red)]">
								{activeLoc.lat.toFixed(4)}°N / {activeLoc.lng.toFixed(4)}°E
							</p>
							<p className="font-[var(--mono)] text-white/60">
								{activeLoc.telemetry}
							</p>
						</div>
					) : (
						<div className={`absolute inset-0 z-0 flex items-center justify-center ${isMobile ? "pointer-events-none" : ""}`}>
							<Globe
								rendererConfig={{ antialias: false, powerPreference: "high-performance" }}
								atmosphereAltitude={0.15}
								atmosphereColor="#d71f69"
								backgroundColor="rgba(0,0,0,0)"
								globeImageUrl="https://unpkg.com/three-globe/example/img/earth-dark.jpg"
								bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
								height={undefined}
								polygonsData={indiaGeoJson}
								polygonCapColor={() => "rgba(215, 31, 105, 0.1)"}
								polygonSideColor={() => "rgba(215, 31, 105, 0.05)"}
								polygonStrokeColor={() => "#d71f69"}
								polygonAltitude={0.01}
								labelsData={globeLabels}
								labelLat={(d: any) => d.lat}
								labelLng={(d: any) => d.lng}
								labelText={(d: any) => d.text}
								labelSize={(d: any) => d.size}
								labelDotRadius={0.5}
								labelColor={(d: any) => d.color}
								labelResolution={2}
								htmlElement={(d: Record<string, any>) => {
									const el = document.createElement("div");
									const isActive = d.id === activeLocationId;

									el.innerHTML = `
										<div class="relative flex items-center justify-center pointer-events-none">
											${isActive ? '<div class="absolute w-8 h-8 rounded-full border border-[var(--red)] opacity-50 animate-ping"></div>' : ""}
											<div class="w-3 h-3 rounded-full ${isActive ? "bg-[var(--red)] shadow-[0_0_10px_var(--red)]" : "bg-[var(--line)] opacity-50"}"></div>
										</div>
									`;
									return el;
								}}
								htmlElementsData={locations}
								onGlobeReady={() => {
									if (globeRef.current) {
										globeRef.current.controls().enableZoom = false;

										// Set initial zoomed-in view
										globeRef.current.pointOfView(
											{
												lat: locations[0]!.lat,
												lng: locations[0]!.lng,
												altitude: locations[0]!.altitude
											},
											0
										);
									}
								}}
								ref={globeRef}
								showAtmosphere={true}
								showGraticules={true}
								width={undefined}
							/>
						</div>
					)}

					{/* Tactical HUD Overlay for the active location */}
					{!prefersReducedMotion && (
						<div className="pointer-events-none absolute right-4 bottom-4 md:right-8 md:bottom-8 z-20 select-none scale-75 md:scale-100 origin-bottom-right">
							<div className="tac-status-row mb-4 flex flex-col items-end gap-2">
								<div className="tac-status-badge border border-[var(--red)] bg-black/50 px-2 py-1 font-bold text-[10px] text-[var(--red)] tracking-widest backdrop-blur-sm">
									TARGET SCAN: ACTIVE
								</div>
								<div
									style={{
										fontFamily: "var(--mono)",
										fontSize: "10px",
										letterSpacing: "0.1em",
										textAlign: "right",
										color: "rgba(255,255,255,0.7)",
									}}
								>
									LATENCY: {(2.4 + Math.random() * 0.5).toFixed(1)}MS
									<br />
									COORD:{" "}
									<span className="text-[var(--red)]">
										{activeLoc.lat.toFixed(4)}°N / {activeLoc.lng.toFixed(4)}°E
									</span>
								</div>
							</div>

							<div
								className="backdrop-blur-md"
								style={{
									fontFamily: "var(--mono)",
									padding: "8px",
									backgroundColor: "rgba(0,0,0,0.5)",
									border: "1px solid rgba(255,255,255,0.1)",
									borderRadius: "2px"
								}}
							>
								<div className="flex items-center gap-4" style={{ marginBottom: "5px" }}>
									<span className="text-xs text-[var(--red)]">
										● ONLINE
									</span>
									<span className="font-bold text-base text-white tracking-widest">
										{activeLoc.name.toUpperCase()}
									</span>
								</div>
								<div
									className="text-xs text-white/70 tracking-[0.15em] uppercase"
									style={{
										maxWidth: "250px",
										lineHeight: "1.15",
										wordSpacing: "2px"
									}}
								>
									{activeLoc.telemetry}
								</div>
							</div>
							<div className="mt-4 flex justify-end">
								<span
									className="border border-[var(--red)]/20 bg-[var(--red)]/10 px-3 py-1.5 text-[10px] text-[var(--red)] tracking-widest uppercase"
									style={{ fontFamily: "var(--mono)" }}
								>
									01 / 02 · SCROLL TO DEPLOY
								</span>
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
