"use client";
import BeijanScript from "~/components/BeijanScript";

export default function HomePage() {
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

			{/* NAV */}
			<nav id="mainNav">
				<a className="nav-logo" href="#hero">
					<img
						alt="Beijan Logo"
						className="logo-img"
						decoding="async"
						loading="lazy"
						src="beijan-logo.png"
					/>
					BEIJAN
				</a>
				<div className="nav-links">
					<a className="active-nav" href="#hero" id="nav-hero">
						HOME
					</a>
					<a href="#about" id="nav-about">
						ABOUT
					</a>
					<a href="#tactical" id="nav-tactical">
						TARGETING
					</a>
					<a href="#products" id="nav-products">
						SYSTEMS
					</a>
					<a href="#deployed" id="nav-deployed">
						DEPLOYED
					</a>
					<a href="#hiring" id="nav-hiring">
						CAREERS
					</a>
				</div>
			</nav>

			{/* ===== HERO ===== */}
			<section id="hero">
				<div className="hero-grid"></div>
				<div className="hero-bar reveal"></div>
				<div className="hero-scanline"></div>
				<div className="hero-coords reveal delay-3" id="heroCoords">
					17.4239°N 78.4738°E
				</div>
				<div className="hero-rng reveal delay-3" id="heroRng">
					RNG 2.4KM
				</div>
				<div
					className="telemetry-stream reveal delay-2"
					id="telemetryStream"
				></div>

				<svg
					className="hero-radar reveal delay-1"
					viewBox="0 0 300 300"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle
						className="radar-ring"
						cx="150"
						cy="150"
						r="130"
						strokeDasharray="4 4"
					></circle>
					<circle className="radar-ring" cx="150" cy="150" r="90"></circle>
					<circle className="radar-ring" cx="150" cy="150" r="50"></circle>
					<line
						className="radar-spoke"
						x1="150"
						x2="150"
						y1="20"
						y2="280"
					></line>
					<line
						className="radar-spoke"
						x1="20"
						x2="280"
						y1="150"
						y2="150"
					></line>
					<line
						className="radar-spoke"
						x1="58"
						x2="242"
						y1="58"
						y2="242"
					></line>
					<line
						className="radar-spoke"
						x1="242"
						x2="58"
						y1="58"
						y2="242"
					></line>
					<path
						d="M20,40 L20,20 L40,20"
						fill="none"
						opacity="0.5"
						stroke="#D4003A"
						strokeWidth="1"
					></path>
					<path
						d="M260,40 L260,20 L240,20"
						fill="none"
						opacity="0.5"
						stroke="#D4003A"
						strokeWidth="1"
					></path>
					<path
						d="M20,260 L20,280 L40,280"
						fill="none"
						opacity="0.5"
						stroke="#D4003A"
						strokeWidth="1"
					></path>
					<path
						d="M260,260 L260,280 L240,280"
						fill="none"
						opacity="0.5"
						stroke="#D4003A"
						strokeWidth="1"
					></path>
					<g className="radar-sweep">
						<path
							d="M150,150 L150,20 A130,130 0 0,1 250,100 Z"
							fill="url(#sweepGrad)"
							opacity="0.35"
						></path>
					</g>
					<circle cx="195" cy="105" fill="#D4003A" opacity="0.9" r="3">
						<animate
							attributeName="opacity"
							dur="1.8s"
							repeatCount="indefinite"
							values="0.9;0.1;0.9"
						></animate>
					</circle>
					<circle
						cx="195"
						cy="105"
						fill="none"
						opacity="0.4"
						r="7"
						stroke="#D4003A"
						strokeWidth="0.8"
					>
						<animate
							attributeName="r"
							dur="1.8s"
							repeatCount="indefinite"
							values="7;14;7"
						></animate>
						<animate
							attributeName="opacity"
							dur="1.8s"
							repeatCount="indefinite"
							values="0.4;0;0.4"
						></animate>
					</circle>
					<line
						opacity="0.8"
						stroke="#D4003A"
						strokeWidth="1"
						x1="150"
						x2="150"
						y1="140"
						y2="156"
					></line>
					<line
						opacity="0.8"
						stroke="#D4003A"
						strokeWidth="1"
						x1="140"
						x2="156"
						y1="150"
						y2="150"
					></line>
					<defs>
						<radialGradient cx="0%" cy="100%" id="sweepGrad" r="100%">
							<stop offset="0%" stopColor="#D4003A" stopOpacity="0.5"></stop>
							<stop offset="100%" stopColor="#D4003A" stopOpacity="0"></stop>
						</radialGradient>
					</defs>
				</svg>

				<div className="hero-title reveal">
					<h1>
						<span className="scramble" data-value="BEIJAN">
							BEIJAN
						</span>
						<br />
						<span className="scramble" data-value="TECH">
							TECH
						</span>
					</h1>
					<p
						className="hero-sub reveal scramble delay-1"
						data-value="GIVING EVERY MACHINE A BRAIN."
					>
						GIVING EVERY MACHINE A BRAIN.
					</p>
					<div className="hero-cta reveal delay-2">
						<button
							className="btn-primary"
							onClick={() => {
								document.getElementById("products")?.scrollIntoView();
							}}
						>
							VIEW SYSTEMS
						</button>
						<button
							className="btn-ghost"
							onClick={() => {
								document.getElementById("about")?.scrollIntoView();
							}}
						>
							WHO WE ARE
						</button>
					</div>
				</div>
				<div className="scroll-hint reveal delay-4">SCROLL</div>
			</section>

			{/* ===== ABOUT ===== */}
			<section id="about">
				<div
					className="section-eyebrow reveal scramble"
					data-value="WHAT WE DO"
				>
					WHAT WE DO
				</div>
				<div className="about-grid crosshair-corner">
					<div className="about-left">
						<h2 className="display-xl reveal delay-1">
							Modular intelligence for{" "}
							<span className="accent">every machine.</span>
						</h2>
						<div className="stat-block reveal delay-2">
							<div className="stat">
								<div className="stat-num">3×</div>
								<div
									className="stat-label scramble"
									data-value="Engagement Speed"
								>
									Engagement Speed
								</div>
								<div className="stat-bar"></div>
							</div>
							<div className="stat">
								<div className="stat-num">&lt;200g</div>
								<div
									className="stat-label scramble"
									data-value="Module Payload"
								>
									Module Payload
								</div>
								<div className="stat-bar"></div>
							</div>
						</div>
					</div>
					<div className="about-right reveal delay-1">
						<p className="body-text" style={{ marginBottom: "32px" }}>
							We build autonomous systems that give defense platforms the
							ability to digitize their environment, analyze data, and act with
							precision. From artillery guns to drones to ground stations — our
							hardware and software modules integrate into existing platforms
							without replacing them.
						</p>
						<p className="body-text">
							The Beijan pipeline: take any machine — an artillery gun, a UAV, a
							logistics unit — and give it the ability to observe, compute, and
							act. Independently. Reliably. In denied environments.
						</p>
						<div className="about-principles" style={{ marginTop: "32px" }}>
							<div className="principle reveal delay-2">
								<span className="principle-num">01</span>
								<div>
									<div className="principle-title">GPS-Denied Navigation</div>
									<div className="principle-body">
										Visual-inertial odometry that operates when satellites can't
										be trusted.
									</div>
								</div>
							</div>
							<div className="principle reveal delay-3">
								<span className="principle-num">02</span>
								<div>
									<div className="principle-title">Edge Compute</div>
									<div className="principle-body">
										Processing happens on the platform. No cloud dependency. No
										latency.
									</div>
								</div>
							</div>
							<div className="principle reveal delay-4">
								<span className="principle-num">03</span>
								<div>
									<div className="principle-title">Platform Agnostic</div>
									<div className="principle-body">
										Plug into any UAV, any gun, any vehicle. Existing fleets
										become intelligent.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ===== TACTICAL MAP PANEL ===== */}
			<div id="tactical-scroll-container" style={{ height: "300vh", position: "relative" }}>
				<section id="tactical" style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
					{/* LEFT: Cream selector panel */}
					<div className="tac-left">
						<div>
							<div className="tac-eyebrow">
								<svg fill="none" height="14" viewBox="0 0 14 14" width="14">
									<circle
										cx="7"
										cy="7"
										r="5"
										stroke="#D4003A"
										strokeWidth="1.2"
									></circle>
									<line
										stroke="#D4003A"
										strokeWidth="1.2"
										x1="7"
										x2="7"
										y1="0"
										y2="3"
									></line>
									<line
										stroke="#D4003A"
										strokeWidth="1.2"
										x1="7"
										x2="7"
										y1="11"
										y2="14"
									></line>
									<line
										stroke="#D4003A"
										strokeWidth="1.2"
										x1="0"
										x2="3"
										y1="7"
										y2="7"
									></line>
									<line
										stroke="#D4003A"
										strokeWidth="1.2"
										x1="11"
										x2="14"
										y1="7"
										y2="7"
									></line>
								</svg>
								[01] AUTONOMY APPLICATIONS
							</div>
							<h2
								className="tac-heading scramble reveal"
								data-value="OUR LOCATIONS."
							>
								OUR LOCATIONS.
							</h2>
							<p className="tac-sub reveal delay-1">Beijan Tech is Present at:</p>
							<div className="tac-selector reveal delay-2" id="tacSelector">
								{/* Items generated by JS */}
							</div>
						</div>
						<div className="tac-footer-note">
							BEIJAN PLATFORM ENGINE V.2026 // HANDSHAKE SECURE
						</div>
					</div>

					{/* RIGHT: Dark targeting map */}
					<div className="tac-right">
						<div className="tac-right-grid"></div>
						<div className="tac-map-bg">
							<img
								alt="Targeting map background"
								decoding="async"
								loading="lazy"
								src="https://www.onestopmap.com/wp-content/uploads/2014/08/119-map-india-political-1.jpg"
							/>
						</div>
						<div className="tac-scanline"></div>

						<div className="tac-status-row">
							<div className="tac-status-badge">TARGET SCAN: ACTIVE</div>
							<div
								style={{
									fontFamily: "var(--mono)",
									fontSize: "9px",
									letterSpacing: "0.1em",
									textAlign: "right",
									color: "rgba(255,255,255,0.35)",
								}}
							>
								LATENCY: 2.4MS
								<br />
								COORD: <span id="tacCoords">17.4239°N / 78.4738°E</span>
							</div>
						</div>

						<div className="tac-crosshair-zone">
							<div
								className="tac-pin"
								id="tacPin"
								style={{
									left: "62%",
									top: "40%",
									transform: "translate(-50%,-50%)",
								}}
							>
								<div className="tac-pin-inner"></div>
								<div className="tac-pin-dot"></div>
								<div className="tac-pin-hline"></div>
								<div className="tac-pin-vline"></div>
							</div>
							<div
								className="tac-callout"
								id="tacCallout"
								style={{ left: "calc(62% + 30px)", top: "calc(40% + 30px)" }}
							>
								<div className="tac-callout-head">
									<span className="tac-callout-online">● ONLINE</span>
									<span id="tacCalloutName">BANM</span>
								</div>
								<div className="tac-callout-name" id="tacCalloutLabel">
									BANM UAV PATROL DELTA
								</div>
								<div
									id="tacCalloutTelemetry"
									style={{
										fontSize: "8px",
										color: "rgba(255,255,255,0.4)",
										marginTop: "2px",
									}}
								>
									ALT: 400M // SPEED: 18m/s // GPS: CONTINGENCY_ACTIVE
								</div>
							</div>
						</div>

						<div className="tac-specs-bar" id="tacSpecsBar">
							{/* Filled by JS */}
						</div>
					</div>
				</section>
			</div>

			{/* ===== PRODUCTS (SCROLL TO REVEAL) ===== */}
			<section id="products">
				<div style={{ padding: "120px 40px 40px" }}>
					<div className="section-eyebrow reveal scramble" data-value="SYSTEMS">
						SYSTEMS
					</div>
					<div
						className="products-header reveal delay-1"
						style={{
							borderTop: "1px solid var(--line)",
							paddingTop: "40px",
							marginBottom: "20px",
						}}
					>
						<h2>
							Two systems.
							<br />
							One platform.
						</h2>
						<p className="products-intro">
							Scroll to deploy. Each product is designed to work standalone or
							as part of the integrated Beijan ecosystem.
						</p>
					</div>
				</div>

				{/* Scroll Container */}
				<div id="products-scroll-container">
					<div className="products-sticky-viewport">
						{/* PAGE 1: BANM */}
						<div className="product-slide active-slide">
							{/* Top: giant acronym banner */}
							<div className="slide-title-banner">
								<span className="slide-title-left-label">HARDWARE MODULE</span>
								<span className="slide-acronym">BANM</span>
								<span className="slide-title-tag">
									01 / 02 &nbsp;·&nbsp; SCROLL TO DEPLOY
								</span>
							</div>
							{/* Bottom: 3-col body */}
							<div className="slide-body">
								{/* Left: tag + description */}
								<div className="slide-body-left">
									<div>
										<div className="slide-hw-label">
											BEIJAN AUTONOMOUS NAV MODULE
										</div>
										<div
											className="product-tag"
											style={{
												display: "inline-flex",
												alignItems: "center",
												gap: "6px",
												marginBottom: "16px",
											}}
										>
											<span
												className="sys-status"
												style={{ margin: "0" }}
											></span>
											HARDWARE
										</div>
										<p className="slide-desc-text">
											A compact hardware module that attaches to any drone,
											giving it edge compute and GPS-denied navigation
											capability. Plug it in, and the UAV becomes part of the
											Beijan ecosystem — intelligent, resilient, and autonomous.
										</p>
									</div>
									<div className="slide-body-left-bottom">
										<div className="term-data">
											&gt; INIT VIO_TRACKER... <span>[OK]</span>
											<br />
											&gt; GYRO_CAL: 0.003, 0.001, -0.004
											<br />
											&gt; MAVLINK_HEARTBEAT: SYS_1 COMP_1
											<br />
											&gt; POSE_EST: VALID (CONF 98.4%)
										</div>
									</div>
								</div>
								{/* Center: product image */}
								<div className="slide-body-center">
									<img
										alt="BANM product image placeholder"
										className="slide-product-img"
										decoding="async"
										loading="lazy"
										src="BANM.png"
									/>
								</div>
								{/* Right: 3 stat callouts */}
								<div className="slide-body-right">
									<div className="slide-stat-block">
										<div className="slide-stat-num">
											<span className="slide-stat-prefix">&lt;&nbsp;</span>200g
										</div>
										<div className="slide-stat-label">MODULE WEIGHT</div>
										<div className="slide-stat-sub">
											Under payload threshold
										</div>
									</div>
									<div className="slide-stat-block">
										<div
											className="slide-stat-num"
											style={{ fontSize: "clamp(22px,2.8vw,34px)" }}
										>
											GPS-
											<br />
											denied
										</div>
										<div className="slide-stat-label">NAVIGATION</div>
										<div className="slide-stat-sub">
											Visual-inertial odometry
										</div>
									</div>
									<div className="slide-stat-block">
										<div
											className="slide-stat-num"
											style={{ fontSize: "clamp(22px,2.8vw,34px)" }}
										>
											Any
											<br />
											UAV
										</div>
										<div className="slide-stat-label">COMPATIBLE</div>
										<div className="slide-stat-sub">Plug-and-play MAVLink</div>
									</div>
								</div>
							</div>
						</div>

						{/* PAGE 2: AAPS */}
						<div className="product-slide">
							<div className="slide-title-banner">
								<span className="slide-title-left-label">HW + SW SYSTEM</span>
								<span className="slide-acronym">AAPS</span>
								<span className="slide-title-tag">
									02 / 02 &nbsp;·&nbsp; SCROLL TO DEPLOY
								</span>
							</div>
							<div className="slide-body">
								<div className="slide-body-left">
									<div>
										<div className="slide-hw-label">
											AUTONOMOUS ARTILLERY POSITIONING SYSTEM
										</div>
										<div
											className="product-tag"
											style={{
												display: "inline-flex",
												alignItems: "center",
												gap: "6px",
												marginBottom: "16px",
											}}
										>
											<span
												className="sys-status"
												style={{ margin: "0" }}
											></span>
											HW + SW
										</div>
										<p className="slide-desc-text">
											Full-stack fire control replacing manual dial sights,
											hand-cranking, and legacy firing tables. CNN-computed
											ballistics, RTK/IMU positioning, and motor-actuated gun
											laying — all in a single closed-loop system.
										</p>
									</div>
									<div className="slide-body-left-bottom">
										<div className="term-data">
											&gt; SOLVING_BALLISTICS... <span>[OK]</span>
											<br />
											&gt; TGT: 17.42N, 78.47E (RNG: 2450m)
											<br />
											&gt; EL: +42.3° / AZ: 114.8°
											<br />
											&gt; MOTORS: ENGAGED_AND_LOCKED
										</div>
									</div>
								</div>
								<div className="slide-body-center">
									<img
										alt="AAPS product image placeholder"
										className="slide-product-img"
										decoding="async"
										loading="lazy"
										src="AAPS.png"
									/>
								</div>
								<div className="slide-body-right">
									<div className="slide-stat-block">
										<div className="slide-stat-num">3×</div>
										<div className="slide-stat-label">ENGAGEMENT SPEED</div>
										<div className="slide-stat-sub">vs. manual baseline</div>
									</div>
									<div className="slide-stat-block">
										<div className="slide-stat-num">
											70
											<span
												style={{
													fontSize: "0.55em",
													color: "var(--ink2)",
													fontWeight: "400",
												}}
											>
												%
											</span>
										</div>
										<div className="slide-stat-label">FEWER ROUNDS</div>
										<div className="slide-stat-sub">
											CNN-computed ballistics
										</div>
									</div>
									<div className="slide-stat-block">
										<div className="slide-stat-num">
											0.1
											<span
												style={{
													fontSize: "0.55em",
													color: "var(--ink2)",
													fontWeight: "400",
												}}
											>
												°
											</span>
										</div>
										<div className="slide-stat-label">POSITIONING</div>
										<div className="slide-stat-sub">RTK / IMU closed-loop</div>
									</div>
								</div>
							</div>
						</div>


					</div>
				</div>

				{/* Ecosystem callout */}
				<div style={{ padding: "0 40px 80px" }}>
					<div
						className="ecosystem-box crosshair-corner reveal delay-2"
						style={{ marginTop: "0" }}
					>
						<div>
							<span className="eco-label scramble" data-value="THE ECOSYSTEM">
								THE ECOSYSTEM
							</span>
							<h3
								style={{
									fontSize: "clamp(28px,3.5vw,44px)",
									fontWeight: "700",
									lineHeight: "1.1",
									letterSpacing: "-0.02em",
								}}
							>
								Designed to integrate,
								<br />
								not replace.
							</h3>
						</div>
						<div className="eco-steps">
							<div className="eco-step">
								<div className="eco-num">01</div>
								<div className="eco-title">Observe</div>
								<div className="eco-desc">BANM UAV streams feed.</div>
							</div>
							<div className="eco-step">
								<div className="eco-num">02</div>
								<div className="eco-title">Designate</div>
								<div className="eco-desc">Operator selects target.</div>
							</div>
							<div className="eco-step">
								<div className="eco-num">03</div>
								<div className="eco-title">Compute</div>
								<div className="eco-desc">CNN processes solution.</div>
							</div>
							<div className="eco-step">
								<div className="eco-num">04</div>
								<div className="eco-title">Execute</div>
								<div className="eco-desc">AAPS automatically fires.</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ===== PLATFORM STATEMENT ===== */}
			<section id="platform">
				<div
					className="platform-eyebrow reveal scramble"
					data-value="[03] MISSION BRIEFING"
				>
					[03] MISSION BRIEFING
				</div>
				<h2 className="platform-heading reveal delay-1">
					This isn't a single product.{" "}
					<span className="accent">It's a platform.</span> Artillery is where we
					prove it.{" "}
					<span className="accent">
						The rest of defense is where we scale it.
					</span>
				</h2>
				<div className="platform-two-col reveal delay-2">
					<div className="platform-col">
						<div className="platform-col-label">THE SYSTEM VISION</div>
						<p className="platform-col-text">
							Modular intelligence &amp; autonomy: take any machine — an
							artillery gun, a combat vehicle, an armoured unit, or a logistics
							system — and give it the ability to digitize its environment,
							analyze data, make decisions, and act safely.
						</p>
					</div>
					<div className="platform-col secondary">
						<div className="platform-col-label">THE DEPLOYMENT VECTOR</div>
						<p className="platform-col-text">
							By decoupling software from heavy proprietary chassis, Beijan
							retrofits existing kinetic hardware. Tactical units get precision
							automation without waiting years for platform replacements.
						</p>
					</div>
				</div>
				<div className="platform-action-row reveal delay-3">
					<p className="platform-note">
						Beijan operates decentralized tactical networks natively designed to
						mitigate signal denial while maximizing kinetic and positioning
						accuracy. Connect with integration engineers below.
					</p>
					<button
						className="btn-dark"
						onClick={() => {
							(window as any).openDrawer?.();
						}}
					>
						SCHEDULE SYSTEM TESTING
						<svg fill="none" height="16" viewBox="0 0 16 16" width="16">
							<path
								d="M3 8H13M13 8L9 4M13 8L9 12"
								stroke="white"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.5"
							></path>
						</svg>
					</button>
				</div>
			</section>

			{/* ===== DEPLOYED ===== */}
			<section id="deployed">
				<div className="deployed-bg">
					<canvas className="terrain-canvas" id="terrainCanvas"></canvas>
					<div className="feed-grain"></div>
					<div className="feed-overlay"></div>
					<div className="feed-vignette"></div>
				</div>
				<div className="hud-corner tl reveal delay-1"></div>
				<div className="hud-corner tr reveal delay-1"></div>
				<div className="hud-corner bl reveal delay-1"></div>
				<div className="hud-corner br reveal delay-1"></div>
				<div className="hud-bottom-bar reveal delay-3"></div>
				<div className="hud-top-left reveal delay-2" id="hudTL">
					MODE: AUTONOMOUS
					<br />
					ALT: 87M
					<br />
					SPD: 12.4 M/S
					<br />
					HDG: 243°
				</div>
				<div className="hud-top-right reveal delay-2" id="hudTR">
					BATT: 78%
					<br />
					GPS: DENIED
					<br />
					NAV: VIO-ACTIVE
					<br />
					LINK: SECURE
				</div>
				<div className="hud-crosshair-container" id="hudTracker">
					<svg
						className="hud-crosshair reveal delay-1"
						fill="none"
						id="hudCrosshairSvg"
						viewBox="0 0 100 100"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle
							cx="50"
							cy="50"
							r="40"
							stroke="rgba(255,0,80,0.4)"
							strokeDasharray="4 4"
							strokeWidth="1"
						></circle>
						<circle
							cx="50"
							cy="50"
							r="20"
							stroke="rgba(255,0,80,0.6)"
							strokeWidth="1.5"
						></circle>
						<line
							stroke="rgba(255,0,80,0.8)"
							strokeWidth="1.5"
							x1="50"
							x2="50"
							y1="0"
							y2="20"
						></line>
						<line
							stroke="rgba(255,0,80,0.8)"
							strokeWidth="1.5"
							x1="50"
							x2="50"
							y1="80"
							y2="100"
						></line>
						<line
							stroke="rgba(255,0,80,0.8)"
							strokeWidth="1.5"
							x1="0"
							x2="20"
							y1="50"
							y2="50"
						></line>
						<line
							stroke="rgba(255,0,80,0.8)"
							strokeWidth="1.5"
							x1="80"
							x2="100"
							y1="50"
							y2="50"
						></line>
						<rect
							fill="rgba(255,0,80,0.8)"
							height="4"
							width="4"
							x="48"
							y="48"
						></rect>
						<path
							d="M 30,30 L 35,30 L 30,35 Z"
							fill="rgba(255,0,80,0.6)"
						></path>
						<path
							d="M 70,30 L 65,30 L 70,35 Z"
							fill="rgba(255,0,80,0.6)"
						></path>
						<path
							d="M 30,70 L 35,70 L 30,65 Z"
							fill="rgba(255,0,80,0.6)"
						></path>
						<path
							d="M 70,70 L 65,70 L 70,65 Z"
							fill="rgba(255,0,80,0.6)"
						></path>
					</svg>
				</div>
				<div className="deployed-content reveal">
					<div className="deployed-label">LIVE FEED — BANM-07 ACTIVE</div>
					<div className="deployed-title">
						<span className="scramble" data-value="DEPLOYED">
							DEPLOYED
						</span>
						<br />
						<span>NOW.</span>
					</div>
					<div className="deployed-sub">
						ARTILLERY CORRECTION SOFTWARE — OPERATIONAL
					</div>
				</div>
			</section>

			{/* ===== HIRING ===== */}
			<section
				id="hiring"
				style={{
					padding: "120px 40px 80px",
					borderTop: "1px solid var(--line)",
				}}
			>
				<div
					className="section-eyebrow reveal scramble"
					data-value="JOIN THE MISSION"
				>
					JOIN THE MISSION
				</div>
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

				{/* Filter Bar */}
				<div className="hiring-filter reveal delay-3">
					<div className="hiring-filter-label">OPEN ROLES // </div>
					<button
						className="filter-btn active"
						onClick={() => {
							(window as any).setJobFilter("ALL");
						}}
					>
						[ALL]
					</button>
					<button
						className="filter-btn"
						onClick={() => {
							(window as any).setJobFilter("HARDWARE");
						}}
					>
						[HARDWARE]
					</button>
					<button
						className="filter-btn"
						onClick={() => {
							(window as any).setJobFilter("SOFTWARE");
						}}
					>
						[SOFTWARE]
					</button>
				</div>

				{/* Dynamic Jobs Container */}
				<div
					className="hiring-list crosshair-corner reveal delay-3"
					id="jobsContainer"
				>
					{/* JS POPULATES JOBS HERE */}
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

			{/* ===== CONTACT ===== */}
			<section id="contact">
				<div className="section-eyebrow reveal scramble" data-value="CONTACT">
					CONTACT
				</div>
				<div className="contact-grid">
					<div className="reveal delay-1">
						<h2
							className="contact-title scramble"
							data-value="Ready to integrate?"
						>
							Ready to integrate?
						</h2>
						<p
							className="body-text"
							style={{ marginTop: "20px", maxWidth: "360px" }}
						>
							We work with defense platforms, system integrators, and
							procurement teams. If your machine needs a brain, we should talk.
						</p>
					</div>
					<div className="contact-right reveal delay-2">
						<a className="contact-email" href="mailto:hello@beijantech.com">
							HELLO@BEIJANTECH.COM →
						</a>
						<p
							style={{
								fontFamily: "var(--mono)",
								fontSize: "9px",
								color: "var(--ink2)",
								letterSpacing: "0.1em",
								marginTop: "8px",
							}}
						>
							Response within 24h // SECURE COMMS
						</p>
					</div>
				</div>
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
