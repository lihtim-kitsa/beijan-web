"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { CrosshairCursor } from "~/components/ui";

const BeijanScript = dynamic(() => import("~/components/BeijanScript"), { ssr: false });

export default function CareersPage() {
	return (
		<>
			<BeijanScript />
			<div id="scroll-progress"></div>

			{/* CUSTOM CURSOR */}
			<div id="cursor" className="hidden lg:block">
				<svg fill="none" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
					<line
						stroke="#D4003A"
						strokeWidth="1.5"
						x1="14"
						x2="14"
						y1="0"
						y2="7"
					></line>
					<line
						stroke="#D4003A"
						strokeWidth="1.5"
						x1="14"
						x2="14"
						y1="21"
						y2="28"
					></line>
					<line
						stroke="#D4003A"
						strokeWidth="1.5"
						x1="0"
						x2="7"
						y1="14"
						y2="14"
					></line>
					<line
						stroke="#D4003A"
						strokeWidth="1.5"
						x1="21"
						x2="28"
						y1="14"
						y2="14"
					></line>
					<circle
						cx="14"
						cy="14"
						fill="none"
						r="5"
						stroke="#D4003A"
						strokeWidth="1.2"
					></circle>
					<circle cx="14" cy="14" fill="#D4003A" r="1.5"></circle>
				</svg>
			</div>

			{/* MENU OVERLAY */}
			<div id="menuOverlay" className="menu-overlay"></div>

			{/* SIDE MENU (Minimal for Careers) */}
			<aside id="sideMenu" className="side-menu">
				<div className="side-menu-header">
					<span className="side-menu-title">BEIJAN TECH</span>
					<button id="closeMenuBtn" className="close-menu-btn">[ CLOSE ]</button>
				</div>
				<div className="nav-links side-nav-links">
					<a href="/" id="nav-hero">
						HOME
					</a>
					<a className="active-nav" href="#hero" id="nav-hiring">
						CAREERS
					</a>
				</div>
				<div className="side-menu-footer">
					© 2026 Beijan Technologies. All rights reserved.
				</div>
			</aside>

			{/* NAV */}
			<nav id="mainNav">
				<a className="nav-logo" href="/">
					<img
						alt="Beijan Logo"
						className="logo-img"
						decoding="async"
						loading="lazy"
						src="/beijan-logo.png"
					/>
					BEIJAN
				</a>
				<button id="openMenuBtn" className="open-menu-btn">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M3 12H21" stroke="var(--ink)" strokeWidth="2" strokeLinecap="square" />
						<path d="M3 6H21" stroke="var(--ink)" strokeWidth="2" strokeLinecap="square" />
						<path d="M3 18H21" stroke="var(--ink)" strokeWidth="2" strokeLinecap="square" />
					</svg>
				</button>
			</nav>

			{/* ===== HERO ===== */}
			<section id="hero" style={{ minHeight: "80vh", justifyContent: "flex-end" }}>
				<div className="hero-grid"></div>
				<div className="hero-bar reveal"></div>
				<div className="hero-scanline"></div>

				<div className="hero-title reveal">
					<h1>
						<span className="scramble" data-value="CAREERS">
							CAREERS
						</span>
					</h1>
					<p
						className="hero-sub reveal scramble delay-1"
						data-value="BUILD THE FUTURE OF AUTONOMOUS SYSTEMS."
					>
						BUILD THE FUTURE OF AUTONOMOUS SYSTEMS.
					</p>
					<div className="hero-cta reveal delay-2">
						<button
							className="btn-primary"
							onClick={() => {
								document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" });
							}}
						>
							VIEW ROLES
						</button>
						<a
							className="btn-ghost"
							href="/"
							style={{ display: "inline-flex", textDecoration: "none", alignItems: "center" }}
						>
							RETURN HOME
						</a>
					</div>
				</div>
			</section>

			{/* ===== HIRING (Culture) ===== */}
			<section id="hiring" style={{ paddingTop: "80px" }}>
				<div
					className="hiring-header reveal delay-1"
					style={{ marginBottom: "60px" }}
				>
					<h2 className="display-xl">
						Build the <span className="accent">future</span> of autonomous
						systems.
					</h2>
					<p className="body-text" style={{ marginTop: "20px" }}>
						We are always looking for exceptional talent to join our mission. If
						you build hard tech, we want to hear from you.
					</p>
				</div>

				{/* Engineering Culture Callout */}
				<div className="culture-block reveal delay-2">
					<div className="stat">
						<div className="stat-num">100%</div>
						<div className="stat-label">IN-PERSON HQ</div>
						<div className="stat-sub">
							Hardware &amp; software under one roof
						</div>
					</div>
					<div className="stat">
						<div
							className="stat-num"
							style={{ fontSize: "clamp(22px,2.8vw,34px)" }}
						>
							SHIP IN
							<br />
							WEEKS
						</div>
						<div className="stat-label">ZERO BUREAUCRACY</div>
						<div className="stat-sub">Rapid prototyping over presentations</div>
					</div>
					<div className="stat">
						<div
							className="stat-num"
							style={{ fontSize: "clamp(22px,2.8vw,34px)" }}
						>
							FULL
							<br />
							STACK
						</div>
						<div className="stat-label">END-TO-END SYSTEM</div>
						<div className="stat-sub">
							Own the pipeline, not just a component
						</div>
					</div>
				</div>

				<div id="open-roles" style={{ paddingTop: "60px" }}></div>
				{/* Filter Bar */}
				<div className="hiring-filter reveal delay-3">
					<div className="hiring-filter-label">OPEN ROLES // </div>
					<button
						className="filter-btn active"
						onClick={() => {
							if (typeof window !== "undefined") (window as any).setJobFilter?.("ALL");
						}}
					>
						[ALL]
					</button>
					<button
						className="filter-btn"
						onClick={() => {
							if (typeof window !== "undefined") (window as any).setJobFilter?.("HARDWARE");
						}}
					>
						[HARDWARE]
					</button>
					<button
						className="filter-btn"
						onClick={() => {
							if (typeof window !== "undefined") (window as any).setJobFilter?.("SOFTWARE");
						}}
					>
						[SOFTWARE]
					</button>
				</div>

				{/* Dynamic Jobs Container (If BeijanScript auto populates it here, we leave it empty. 
				    Otherwise, we can add static content if BeijanScript only targets the homepage) */}
				<div
					className="hiring-list crosshair-corner reveal delay-3"
					id="jobsContainer"
				>
					{/* Fallback jobs in case BeijanScript doesn't populate on this route */}
					<div className="job-row" data-category="SOFTWARE">
						<div className="job-info">
							<div className="job-title">Software Engineer, Autonomy</div>
							<div className="job-meta">
								<span className="job-tag">SOFTWARE</span>
								<span>San Francisco, CA</span>
							</div>
						</div>
						<div className="job-arrow">→</div>
					</div>
					<div className="job-row" data-category="HARDWARE">
						<div className="job-info">
							<div className="job-title">Mechanical Engineer, Structures</div>
							<div className="job-meta">
								<span className="job-tag">HARDWARE</span>
								<span>San Francisco, CA</span>
							</div>
						</div>
						<div className="job-arrow">→</div>
					</div>
					<div className="job-row" data-category="SOFTWARE">
						<div className="job-info">
							<div className="job-title">Robotics Perception Engineer</div>
							<div className="job-meta">
								<span className="job-tag">SOFTWARE</span>
								<span>San Francisco, CA</span>
							</div>
						</div>
						<div className="job-arrow">→</div>
					</div>
				</div>

				{/* Open Application Catch-all */}
				<div className="open-app-block reveal delay-4">
					<div>
						<div className="open-app-title">DON'T SEE YOUR EXACT ROLE?</div>
						<div className="open-app-desc">
							If you are a top 1% engineer, we'll create a role for you. We need
							brilliant minds across mechanical, firmware, perception, and
							operations.
						</div>
					</div>
					<a
						className="btn-dark"
						href="mailto:hello@beijantech.com?subject=Open Application"
						style={{
							textDecoration: "none",
							cursor: "none",
							display: "inline-flex",
							alignItems: "center",
							gap: "8px",
						}}
					>
						APPLY VIA EMAIL
						<svg fill="none" height="16" viewBox="0 0 16 16" width="16">
							<path
								d="M3 8H13M13 8L9 4M13 8L9 12"
								stroke="white"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.5"
							></path>
						</svg>
					</a>
				</div>
			</section>

			{/* ===== FOOTER MINIMAL ===== */}
			<section style={{ padding: "40px 40px 40px 40px", borderTop: "1px solid var(--line)", marginTop: "80px" }}>
				<div className="footer-bottom reveal delay-3">
					<div>
						<div className="footer-logo">BEIJAN</div>
						<div className="footer-tagline">Giving every machine a brain.</div>
					</div>
					<div className="footer-right">
						<a className="back-top" href="#hero">
							↑ BACK TO TOP
						</a>
						<div className="footer-copy">
							© 2026 Beijan Technologies. All rights reserved.
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
