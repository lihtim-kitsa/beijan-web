// @ts-nocheck

"use client";
import { useEffect } from "react";

export default function BeijanScript() {
	useEffect(() => {
		(() => {
			// ===== PRODUCTS DATA =====
			const productsData = [
				{
					id: "banm",
					name: "HYDERABAD",
					type: "MAIN OFFICE + 4 BANM TESTING LOCATIONS",
					mapCoord: { x: "36.8%", y: "61.3%" },
					mapLabel: "HYDERABAD",
					telemetry: "MAIN OFFICE + 4 BANM TESTING LOCATIONS",
					specs: [
						{ label: "MODULE WEIGHT", value: "< 200g" },
						{ label: "NAVIGATION", value: "GPS-denied" },
						{ label: "COMPATIBILITY", value: "Any UAV" },
					],
				},
				{
					id: "aaps",
					name: "POKHRAN",
					type: "BANM TESTING LOCATION",
					mapCoord: { x: "18%", y: "22.5%" },
					mapLabel: "POKHRAN",
					telemetry: "TESTED AT 600M // SENSOR COMPLIANCE: SECURE",
					specs: [
						{ label: "TESTED AT", value: "600 M" },
						{ label: "NAVIGATION", value: "GPS-denied" },
						{ label: "COMPATIBILITY", value: "Any UAV" },
					],
				},
				{
					id: "leh",
					name: "LEH",
					type: "BANM TESTING LOCATION",
					mapCoord: { x: "37%", y: "-6.3%" },
					mapLabel: "LEH",
					telemetry: "TESTED AT 600M // SENSOR COMPLIANCE: SECURE",
					specs: [
						{ label: "TESTED AT", value: "600 M" },
						{ label: "NAVIGATION", value: "GPS-denied" },
						{ label: "COMPATIBILITY", value: "Any UAV" },
					],
				},
			];
			const activeProduct = productsData[0];

			// ===== JOBS DATA =====
			const jobsData = [
				{
					title: "Embedded Systems Engineer",
					category: "HARDWARE",
					location: "HYDERABAD",
					shortDesc:
						"Design and implement bare-metal firmware for real-time edge compute modules.",
					about:
						"You will be responsible for building the core bare-metal firmware that powers our edge compute modules. This requires a deep understanding of embedded systems, RTOS, and performance optimization for critical real-time constraints.",
					reqs: [
						"Strong experience with C/C++ in embedded environments.",
						"Experience with STM32 or other ARM Cortex-M microcontrollers.",
						"Familiarity with hardware communication protocols (SPI, I2C, UART, CAN).",
						"Ability to read hardware schematics and use oscilloscopes/logic analyzers.",
					],
					emailSubject: "Embedded Systems Engineer Application",
				},
				{
					title: "Perception Engineer (VIO/SLAM)",
					category: "SOFTWARE",
					location: "HYDERABAD",
					shortDesc:
						"Build GPS-denied navigation systems using visual-inertial odometry.",
					about:
						"We are seeking a perception engineer to enhance our visual-inertial odometry pipelines. You will optimize SLAM algorithms for edge hardware to ensure robust GPS-denied navigation in dynamic and texture-less environments.",
					reqs: [
						"Solid background in SLAM, VIO, and 3D geometry.",
						"Strong C++ programming skills and experience with OpenCV/Eigen.",
						"Familiarity with filtering techniques (EKF, UKF) or factor graphs (GTSAM, Ceres).",
						"Previous experience deploying perception models to embedded devices.",
					],
					emailSubject: "Perception Engineer Application",
				},
				{
					title: "Full Stack Engineer (Ground Station)",
					category: "SOFTWARE",
					location: "HYDERABAD",
					shortDesc:
						"Develop low-latency, mission-critical operator interfaces and telemetry dashboards.",
					about:
						"You will build the Beijan Ground Station (BGS) interface. This involves handling real-time telemetry, live video feeds, and mission planning tools in a seamless UI for operators in high-stress environments.",
					reqs: [
						"Strong proficiency in React, TypeScript, and Node.js.",
						"Experience with WebSockets and high-frequency data streams.",
						"Knowledge of UX principles for complex dashboards.",
						"(Bonus) Familiarity with MAVLink or GIS/mapping libraries (Mapbox, Leaflet).",
					],
					emailSubject: "Full Stack Engineer Application",
				},
			];

			let activeJobFilter = "ALL";

			(window as any).setJobFilter = (filter) => {
				activeJobFilter = filter;
				document.querySelectorAll(".filter-btn").forEach((btn) => {
					btn.classList.toggle("active", btn.innerText === `[${filter}]`);
				});
				renderJobs();
			};

			function renderJobs() {
				const container = document.getElementById("jobsContainer");
				if (!container) return;
				const filtered = jobsData.filter(
					(j) => activeJobFilter === "ALL" || j.category === activeJobFilter,
				);
				container.innerHTML = filtered
					.map(
						(job) => `
    <div class="jd-item" onclick="this.classList.toggle('expanded')">
      <div class="jd-header">
        <div class="jd-left">
          <div class="jd-title scramble-job" data-value="${job.title}">${job.title}</div>
          <div class="jd-tags">
            <span class="product-tag">${job.category}</span>
            <span class="product-tag">${job.location}</span>
          </div>
        </div>
        <div class="jd-right">
          <div class="jd-desc">${job.shortDesc}</div>
          <div class="jd-arrow">+</div>
        </div>
      </div>
      <div class="jd-body">
        <div class="jd-body-content" onclick="event.stopPropagation()">
          <h4>ABOUT THE ROLE</h4>
          <p>${job.about}</p>
          <h4>REQUIREMENTS</h4>
          <ul>
            ${job.reqs.map((r) => `<li>${r}</li>`).join("")}
          </ul>
          <a href="mailto:hello@beijantech.com?subject=${encodeURIComponent(job.emailSubject)}" class="btn-primary" style="margin-top:24px; display:inline-block; text-decoration:none; cursor:none;">APPLY VIA EMAIL</a>
          <a href="javascript:void(0)" class="btn-ghost" style="margin-top:24px; margin-left:12px; display:inline-block; text-decoration:none; cursor:none;" onclick="alert('Redirecting to Applicant Tracking System...');">APPLY ON PORTAL ↗</a>
        </div>
      </div>
    </div>
  `,
					)
					.join("");
				container.querySelectorAll(".scramble-job").forEach((el) => {
					scrambleText(el);
				});
			}

			// ===== TACTICAL MAP LOGIC MOVED TO REACT COMPONENT =====

			// ===== SCRAMBLE =====
			const scrambleChars = "!<>-_\\/[]{}—=+*^?#_";
			function scrambleText(element) {
				const original = element.getAttribute("data-value");
				if (!original) return;
				let iteration = 0;
				clearInterval(element.scrambleInterval);
				element.scrambleInterval = setInterval(() => {
					element.innerText = original
						.split("")
						.map((letter, index) => {
							if (index < iteration) return original[index];
							return scrambleChars[
								Math.floor(Math.random() * scrambleChars.length)
							];
						})
						.join("");
					if (iteration >= original.length)
						clearInterval(element.scrambleInterval);
					iteration += 1 / 3;
				}, 10);
			}

			// ===== SCROLL REVEAL & SCRAMBLE =====
			function initObservers() {
				const revealObserver = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							if (entry.isIntersecting) {
								entry.target.classList.add("visible");
								if (entry.target.classList.contains("scramble")) {
									scrambleText(entry.target);
									entry.target.classList.remove("scramble");
								}
								revealObserver.unobserve(entry.target);
							}
						});
					},
					{ threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
				);

				document.querySelectorAll(".reveal").forEach((el) => {
					el.classList.remove("visible");
					if (el.hasAttribute("data-value")) el.classList.add("scramble");
					revealObserver.observe(el);
				});

				// Scrollspy
				const sections = document.querySelectorAll("section");
				const navLinks = document.querySelectorAll(".nav-links a");
				const sectionObserver = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							if (entry.isIntersecting) {
								navLinks.forEach((link) => {
									link.classList.remove("active-nav");
									if (link.getAttribute("href") === "#" + entry.target.id)
										link.classList.add("active-nav");
								});
							}
						});
					},
					{ threshold: 0.3 },
				);
				sections.forEach((s) => {
					sectionObserver.observe(s);
				});
			}

			// ===== CURSOR =====
			const cursor = document.getElementById("cursor");
			const crosshairSvg = document.getElementById("hudCrosshairSvg");
			const isTouch = window.matchMedia("(pointer: coarse)").matches;
			if (!isTouch && cursor) {
				document.addEventListener("mousemove", (e) => {
					cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
					if (crosshairSvg) {
						const xOffset = (e.clientX / window.innerWidth - 0.5) * 40;
						const yOffset = (e.clientY / window.innerHeight - 0.5) * 40;
						crosshairSvg.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px))`;
					}
				});
				// Event delegation for custom cursor hover states (supports dynamic content like jobs)
				document.addEventListener("mouseover", (e) => {
					if (
						e.target &&
						(e.target as Element).closest &&
						(e.target as Element).closest(
							"a, button, .product-slide, .tac-item, .jd-header",
						)
					) {
						cursor.classList.add("hovered");
					}
				});
				document.addEventListener("mouseout", (e) => {
					if (
						e.target &&
						(e.target as Element).closest &&
						(e.target as Element).closest(
							"a, button, .product-slide, .tac-item, .jd-header",
						)
					) {
						cursor.classList.remove("hovered");
					}
				});
			} else if (cursor) {
				cursor.style.display = "none";
			}

			// ===== SIDE MENU LOGIC =====
			const openMenuBtn = document.getElementById("openMenuBtn");
			const closeMenuBtn = document.getElementById("closeMenuBtn");
			const sideMenu = document.getElementById("sideMenu");
			const menuOverlay = document.getElementById("menuOverlay");
			const sideNavLinks = document.querySelectorAll(".side-nav-links a");

			function toggleMenu(forceClose = false) {
				if (!sideMenu || !menuOverlay) return;
				if (forceClose) {
					sideMenu.classList.remove("open");
					menuOverlay.classList.remove("open");
					document.body.style.overflow = "";
				} else {
					sideMenu.classList.toggle("open");
					menuOverlay.classList.toggle("open");
					document.body.style.overflow = sideMenu.classList.contains("open")
						? "hidden"
						: "";
				}
			}

			if (openMenuBtn) openMenuBtn.onclick = () => toggleMenu();
			if (closeMenuBtn) closeMenuBtn.onclick = () => toggleMenu(true);
			if (menuOverlay) menuOverlay.onclick = () => toggleMenu(true);

			sideNavLinks.forEach((link: any) => {
				link.onclick = () => toggleMenu(true);
			});

			// ===== NAV SCROLL =====
			let scrollRafPending = false;
			let lastScrollY = window.scrollY;

			window.addEventListener(
				"scroll",
				() => {
					if (!scrollRafPending) {
						scrollRafPending = true;
						requestAnimationFrame(() => {
							const mainNav = document.getElementById("mainNav");
							if (mainNav) {
								const currentScrollY = window.scrollY;

								// Toggle scrolled state (background blur)
								mainNav.classList.toggle("scrolled", currentScrollY > 20);

								// Removed hide on scroll down, show on scroll up logic

								lastScrollY = currentScrollY;
							}

							// Progress Bar
							const winScroll =
								document.body.scrollTop || document.documentElement.scrollTop;
							const height =
								document.documentElement.scrollHeight -
								document.documentElement.clientHeight;
							const scrolled = (winScroll / height) * 100;
							const progress = document.getElementById("scroll-progress");
							if (progress) progress.style.width = scrolled + "%";

							scrollRafPending = false;
						});
					}
				},
				{ passive: true },
			);
			// ===== SCROLL-DRIVEN TACTICAL MAP MOVED TO REACT COMPONENT =====

			// ===== SCROLL-DRIVEN PRODUCT FADE =====
			function initStickyProductScroll() {
				const container = document.getElementById("products-scroll-container");
				const slides = document.querySelectorAll(".product-slide");
				if (!container || slides.length === 0) return;

				let rafPending = false;

				function onScroll() {
					const rect = container.getBoundingClientRect();
					const viewportHeight = window.innerHeight;

					// Total scrollable area is the container's height minus one viewport height
					const totalScrollable = rect.height - viewportHeight;

					// Calculate scroll progress from 0.0 to 1.0
					let progress = -rect.top / totalScrollable;
					progress = Math.max(0, Math.min(1, progress));

					// Determine the active index based on the progress
					let activeIndex = Math.floor(progress * slides.length);
					if (activeIndex >= slides.length) activeIndex = slides.length - 1; // Clamp exact 1.0 to the last slide

					slides.forEach((slide, idx) => {
						if (idx === activeIndex) {
							slide.classList.add("active-slide");
							slide.classList.remove("prev-slide", "next-slide");
						} else if (idx < activeIndex) {
							slide.classList.remove("active-slide", "next-slide");
							slide.classList.add("prev-slide");
						} else {
							slide.classList.remove("active-slide", "prev-slide");
							slide.classList.add("next-slide");
						}
					});
				}

				// Throttle to screen refresh rate
				window.addEventListener(
					"scroll",
					() => {
						if (!rafPending) {
							rafPending = true;
							requestAnimationFrame(() => {
								onScroll();
								rafPending = false;
							});
						}
					},
					{ passive: true },
				);

				// Init on load
				onScroll();
			}

			// ===== TELEMETRY STREAM =====
			function updateTelemetry() {
				const stream = document.getElementById("telemetryStream");
				if (!stream) return;
				const prefixes = [
					"SYS_LOG:",
					"MEM_ALLOC:",
					"NET_SYNC:",
					"GPS_STAT:",
					"GYR_CAL:",
				];
				let str = "";
				for (let i = 0; i < 4; i++) {
					const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
					const hex = Math.random().toString(16).substr(2, 8).toUpperCase();
					str += `${prefix} <span>0x${hex}</span><br>`;
				}
				stream.innerHTML = str;
			}
			setInterval(updateTelemetry, 150);

			// ===== HERO COORDS =====
			function animateCoords() {
				const c = document.getElementById("heroCoords");
				const r = document.getElementById("heroRng");
				const tc = document.getElementById("tacCoords");
				if (!c || !r) return;
				const lat = (17.4239 + (Math.random() - 0.5) * 0.002).toFixed(4);
				const lon = (78.4738 + (Math.random() - 0.5) * 0.002).toFixed(4);
				const rng = (2.4 + (Math.random() - 0.5) * 0.2).toFixed(1);
				c.textContent = lat + "°N " + lon + "°E";
				r.textContent = "RNG " + rng + "KM";
				if (tc) tc.textContent = lat + "°N / " + lon + "°E";
			}
			setInterval(animateCoords, 1200);

			// ===== LIVE DRONE FOOTAGE SIMULATION =====
			// Simulates real forward flight: a large terrain buffer is generated once,
			// then panned + slightly rotated/drifted every frame to feel like POV footage.
			// HUD figures (alt/spd/hdg) are derived from the same simulated flight state,
			// not random noise, so everything reads as one consistent feed.

			const droneFeed = {
				canvas: null,
				ctx: null,
				buffer: null, // offscreen canvas with the painted terrain (larger than viewport)
				bufferCtx: null,
				bufW: 0,
				bufH: 0,
				viewW: 0,
				viewH: 0,
				panX: 0,
				panY: 0, // current top-left read position inside the buffer
				heading: 243, // degrees, drifts slowly
				headingTarget: 243,
				speed: 12.4, // m/s, drives pan speed
				altitude: 87,
				battery: 78,
				t: 0, // running time counter for noise/oscillation
				target: { bx: 0, by: 0, lockTimer: 0, locked: false }, // a tracked object in buffer space
				raf: null,
			};

			function buildTerrainBuffer(ctx, W, H, seedFn) {
				ctx.fillStyle = "#1a1a14";
				ctx.fillRect(0, 0, W, H);

				// Base patchwork — fields/terrain blocks
				for (let i = 0; i < 140; i++) {
					const x = seedFn() * W,
						y = seedFn() * H;
					const w = 30 + seedFn() * 160,
						h = 20 + seedFn() * 90;
					const c = Math.round(28 + seedFn() * 42);
					ctx.fillStyle = `rgb(${c},${c},${Math.round(c * 0.85)})`;
					ctx.fillRect(x, y, w, h);
				}

				// Field-line grid (faint furrows / boundaries)
				for (let i = 0; i < 26; i++) {
					ctx.strokeStyle = `rgba(${60 + (i % 8) * 5},${55 + (i % 8) * 4},40,0.5)`;
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(seedFn() * W, 0);
					ctx.lineTo(seedFn() * W, H);
					ctx.stroke();
				}
				for (let i = 0; i < 18; i++) {
					ctx.strokeStyle = `rgba(${55 + (i % 6) * 4},${50 + (i % 6) * 4},38,0.4)`;
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(0, seedFn() * H);
					ctx.lineTo(W, seedFn() * H);
					ctx.stroke();
				}

				// Winding roads/rivers
				for (let i = 0; i < 10; i++) {
					ctx.strokeStyle = "rgba(80,75,60,0.85)";
					ctx.lineWidth = 2 + seedFn() * 3;
					ctx.beginPath();
					const sx = seedFn() * W,
						ex = seedFn() * W;
					const sy = 0,
						ey = H;
					ctx.moveTo(sx, sy);
					ctx.bezierCurveTo(
						sx + (seedFn() - 0.5) * 300,
						H * 0.3,
						ex + (seedFn() - 0.5) * 300,
						H * 0.7,
						ex,
						ey,
					);
					ctx.stroke();
				}

				// Scattered texture (trees/rocks/structures as dots)
				for (let i = 0; i < 900; i++) {
					const x = seedFn() * W,
						y = seedFn() * H,
						r = 1 + seedFn() * 4;
					ctx.beginPath();
					ctx.arc(x, y, r, 0, Math.PI * 2);
					ctx.fillStyle = `rgba(${25 + seedFn() * 20},${35 + seedFn() * 25},${15 + seedFn() * 15},0.8)`;
					ctx.fill();
				}

				// A handful of brighter "structures" — small rectangles, simulating buildings/vehicles
				for (let i = 0; i < 14; i++) {
					const x = seedFn() * W,
						y = seedFn() * H;
					const w = 6 + seedFn() * 14,
						h = 6 + seedFn() * 10;
					ctx.fillStyle = `rgba(${90 + seedFn() * 40},${85 + seedFn() * 35},${70 + seedFn() * 30},0.9)`;
					ctx.fillRect(x, y, w, h);
				}
			}

			function initTerrain() {
				const canvas = document.getElementById("terrainCanvas");
				if (!canvas) return;
				const ctx = canvas.getContext("2d");
				const dpr = Math.min(window.devicePixelRatio || 1, 2);

				// Measure the parent container instead of the canvas directly
				const parent = canvas.parentElement;
				const viewW = parent.offsetWidth || window.innerWidth;
				const viewH = parent.offsetHeight || window.innerHeight;

				canvas.width = viewW * dpr;
				canvas.height = viewH * dpr;
				ctx.scale(dpr, dpr);

				droneFeed.canvas = canvas;
				droneFeed.ctx = ctx;
				droneFeed.viewW = viewW;
				droneFeed.viewH = viewH;

				// Build an offscreen buffer significantly larger than the viewport so we
				// have room to pan continuously without ever hitting an edge for a long time.
				const bufW = Math.max(viewW * 4, 2400);
				const bufH = Math.max(viewH * 4, 2400);
				const buffer = document.createElement("canvas");
				buffer.width = bufW;
				buffer.height = bufH;
				const bufferCtx = buffer.getContext("2d");

				let seedState = 42;
				const seedFn = () => {
					// simple deterministic PRNG so re-generating on resize feels stable
					seedState = (seedState * 9301 + 49297) % 233280;
					return seedState / 233280;
				};

				buildTerrainBuffer(bufferCtx, bufW, bufH, seedFn);

				droneFeed.buffer = buffer;
				droneFeed.bufferCtx = bufferCtx;
				droneFeed.bufW = bufW;
				droneFeed.bufH = bufH;

				// Start the pan roughly centered so we can drift any direction
				droneFeed.panX = bufW / 2 - viewW / 2;
				droneFeed.panY = bufH / 2 - viewH / 2;

				// Place a target somewhere onscreen-ish within the buffer for the tracker to find
				droneFeed.target.bx = droneFeed.panX + viewW * 0.62;
				droneFeed.target.by = droneFeed.panY + viewH * 0.4;

				if (droneFeed.raf) cancelAnimationFrame(droneFeed.raf);

				// Use IntersectionObserver to pause loop when out of view
				const section = document.getElementById("deployed");
				if (section) {
					const observer = new IntersectionObserver(
						(entries) => {
							if (entries[0].isIntersecting) {
								if (!droneFeed.raf) runDroneFeedLoop();
							} else {
								if (droneFeed.raf) {
									cancelAnimationFrame(droneFeed.raf);
									droneFeed.raf = null;
								}
							}
						},
						{ threshold: 0 },
					);
					observer.observe(section);
				} else {
					runDroneFeedLoop();
				}
			}

			function runDroneFeedLoop() {
				const f = droneFeed;
				f.t += 1;

				// ---- Simulated flight dynamics ----
				// Heading wanders slowly within a patrol-like arc
				f.headingTarget += (Math.random() - 0.5) * 0.6;
				f.headingTarget = Math.max(225, Math.min(261, f.headingTarget));
				f.heading += (f.headingTarget - f.heading) * 0.04;

				// Speed oscillates gently around a cruise value
				f.speed =
					12.4 + Math.sin(f.t * 0.01) * 0.7 + Math.sin(f.t * 0.037) * 0.3;

				// Altitude breathes slightly (simulating air turbulence / terrain following)
				f.altitude =
					87 + Math.sin(f.t * 0.013) * 3.2 + Math.sin(f.t * 0.041) * 1.1;

				// Battery drains very slowly over the session
				f.battery = Math.max(61, 78 - f.t * 0.0025);

				// ---- Pan the terrain buffer to simulate forward motion ----
				// Convert heading into a direction vector; "forward" pans the read window
				// through the buffer, which makes the ground appear to slide backward/away.
				const rad = ((f.heading - 90) * Math.PI) / 180; // 0deg heading = up/forward on screen
				const baseSpeed = f.speed * 0.16; // px/frame scaling tuned for visual feel
				let dx = Math.cos(rad) * baseSpeed;
				let dy = Math.sin(rad) * baseSpeed;

				// subtle handheld-style jitter for realism
				dx += (Math.random() - 0.5) * 0.25;
				dy += (Math.random() - 0.5) * 0.25;

				f.panX += dx;
				f.panY += dy;

				// Wrap pan position within buffer bounds so flight can continue indefinitely
				const maxPanX = f.bufW - f.viewW;
				const maxPanY = f.bufH - f.viewH;
				if (f.panX < 0) f.panX += maxPanX;
				if (f.panX > maxPanX) f.panX -= maxPanX;
				if (f.panY < 0) f.panY += maxPanY;
				if (f.panY > maxPanY) f.panY -= maxPanY;

				// ---- Draw the current viewport slice from the buffer ----
				const ctx = f.ctx;
				ctx.save();
				// tiny rotational sway to sell handheld/gimbal motion
				const sway = Math.sin(f.t * 0.018) * 0.6; // degrees
				ctx.translate(f.viewW / 2, f.viewH / 2);
				ctx.rotate((sway * Math.PI) / 180);
				ctx.translate(-f.viewW / 2, -f.viewH / 2);

				ctx.drawImage(
					f.buffer,
					f.panX,
					f.panY,
					f.viewW,
					f.viewH,
					-10,
					-10,
					f.viewW + 20,
					f.viewH + 20, // slight oversize to hide rotation edges
				);
				ctx.restore();

				// ---- Draw a tracked target blip if it's within the current view ----
				const tScreenX = f.target.bx - f.panX;
				const tScreenY = f.target.by - f.panY;
				const visible =
					tScreenX > 20 &&
					tScreenX < f.viewW - 20 &&
					tScreenY > 20 &&
					tScreenY < f.viewH - 20;

				if (visible) {
					f.target.lockTimer++;
					const pulse = 0.5 + Math.sin(f.t * 0.12) * 0.5;
					ctx.strokeStyle = `rgba(212,0,58,${0.55 + pulse * 0.35})`;
					ctx.lineWidth = 1.2;
					ctx.strokeRect(tScreenX - 22, tScreenY - 16, 44, 32);
					ctx.beginPath();
					ctx.moveTo(tScreenX, tScreenY - 16);
					ctx.lineTo(tScreenX, tScreenY - 24);
					ctx.moveTo(tScreenX, tScreenY + 16);
					ctx.lineTo(tScreenX, tScreenY + 24);
					ctx.moveTo(tScreenX - 22, tScreenY);
					ctx.lineTo(tScreenX - 30, tScreenY);
					ctx.moveTo(tScreenX + 22, tScreenY);
					ctx.lineTo(tScreenX + 30, tScreenY);
					ctx.stroke();
					f.target.locked = f.target.lockTimer > 40;
					if (f.target.locked) {
						ctx.fillStyle = "rgba(212,0,58,0.9)";
						ctx.font = "9px monospace";
						ctx.fillText("TGT LOCK", tScreenX - 20, tScreenY - 30);
					}
				} else {
					f.target.lockTimer = 0;
					f.target.locked = false;
				}

				// Occasionally relocate target once it's drifted far out of frame, so a
				// new "contact" appears periodically rather than vanishing forever.
				if (!visible && Math.random() < 0.004) {
					f.target.bx = f.panX + f.viewW * (0.25 + Math.random() * 0.5);
					f.target.by = f.panY + f.viewH * (0.25 + Math.random() * 0.5);
				}

				// ---- Sync HUD readouts to the simulated flight state ----
				const tl = document.getElementById("hudTL");
				const tr = document.getElementById("hudTR");
				if (tl && tr) {
					tl.innerHTML = `MODE: AUTONOMOUS<br>ALT: ${Math.round(f.altitude)}M<br>SPD: ${f.speed.toFixed(1)} M/S<br>HDG: ${Math.round(f.heading)}°`;
					tr.innerHTML = `BATT: ${Math.round(f.battery)}%<br>GPS: DENIED<br>NAV: VIO-ACTIVE<br>LINK: ${f.target.locked ? "TGT LOCKED" : "SECURE"}`;
				}

				f.raf = requestAnimationFrame(runDroneFeedLoop);
			}

			// Rebuild on resize so the feed always fills the section cleanly
			let droneFeedResizeTimer = null;
			window.addEventListener("resize", () => {
				clearTimeout(droneFeedResizeTimer);
				droneFeedResizeTimer = setTimeout(() => {
					if (document.getElementById("terrainCanvas")) initTerrain();
				}, 250);
			});

			// ===== INIT =====
			const initAll = () => {
				initObservers();
				initTerrain();
				renderJobs();
				initStickyProductScroll();
			};
			if (document.readyState === "complete") {
				initAll();
			} else {
				window.addEventListener("load", initAll);
			}
		})();
	}, []);
	return null;
}
