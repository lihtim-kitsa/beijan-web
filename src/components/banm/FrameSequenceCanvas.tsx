"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";
import { banmConfig } from "~/data/banmConfig";

interface FrameSequenceCanvasProps {
	progress: number; // 0 to 1
}

const TOTAL_FRAMES = banmConfig.totalFrames;

function getFrameUrl(index: number): string {
	const paddedIndex = index.toString().padStart(4, "0");
	return `/banm-frames/1080p/${paddedIndex}.webp`;
}

export default function FrameSequenceCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	// Caching loaded image objects
	const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
	const loadingRef = useRef<Set<number>>(new Set());

	// Use a ref for the target frame so we can update it without React re-renders
	const targetFrameRef = useRef(1);
	const currentFrameRef = useRef(1);

	// Listen to the custom scroll event
	useEffect(() => {
		const handleScroll = (e: any) => {
			const p = e.detail;

			// Map 0 -> 0.5 to frames 1 -> TOTAL_FRAMES
			// Above 0.5, stay on TOTAL_FRAMES
			let animationProgress = p * 2;
			animationProgress = Math.max(0, Math.min(1, animationProgress));

			const targetFrame = Math.max(
				1,
				Math.min(TOTAL_FRAMES, Math.floor(animationProgress * TOTAL_FRAMES) + 1)
			);
			targetFrameRef.current = targetFrame;
		};
		window.addEventListener("banm-scroll", handleScroll);
		return () => window.removeEventListener("banm-scroll", handleScroll);
	}, []);

	// Load a specific image and return a promise
	const loadImage = (index: number): Promise<HTMLImageElement> => {
		return new Promise((resolve, reject) => {
			if (imagesRef.current.has(index)) {
				return resolve(imagesRef.current.get(index)!);
			}
			if (loadingRef.current.has(index)) {
				return reject("Already loading");
			}

			loadingRef.current.add(index);
			const img = new Image();
			img.src = getFrameUrl(index);

			// Use asynchronous decode() to prevent main-thread jank when drawing 4K images
			if ("decode" in img) {
				img.decode().then(() => {
					imagesRef.current.set(index, img);
					loadingRef.current.delete(index);
					resolve(img);
				}).catch((err) => {
					loadingRef.current.delete(index);
					reject(err);
				});
			} else {
				const fallback = img as any;
				fallback.onload = () => {
					imagesRef.current.set(index, img);
					loadingRef.current.delete(index);
					resolve(img);
				};
				fallback.onerror = (err: any) => {
					loadingRef.current.delete(index);
					reject(err);
				};
			}
		});
	};

	// Draw an image to the canvas with dynamic tracking math
	const drawImage = (img: HTMLImageElement, frameIndex: number) => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		// Optimize compositing by disabling alpha (since background is opaque/black)
		const ctx = canvas.getContext("2d", { alpha: false });
		if (!ctx) return;

		// Responsive sizing with devicePixelRatio
		const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
		const rect = canvas.parentElement?.getBoundingClientRect();

		if (rect) {
			if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
				canvas.width = rect.width * dpr;
				canvas.height = rect.height * dpr;
				canvas.style.width = `${rect.width}px`;
				canvas.style.height = `${rect.height}px`;
			}
		}

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// object-fit: cover math
		const hRatio = canvas.width / img.width;
		const vRatio = canvas.height / img.height;
		const ratio = Math.max(hRatio, vRatio);

		const scaledWidth = img.width * ratio;
		const scaledHeight = img.height * ratio;

		// Compute focal point based on frame to track the module
		const getFocalPoint = (f: number) => {
			const pts = [
				{ f: 1, x: 0.5, y: 0.25 },       // Start perfectly centered
				{ f: 180, x: 0.5, y: 0.25 },     // Hold center for the initial drone fly-in
				{ f: 250, x: 0.7, y: 0.25 },    // Smoothly pan right to focus on BANM as it detaches
				{ f: 300, x: 0.7, y: 0.25 }     // Hold focus on BANM
			];
			for (let i = 0; i < pts.length - 1; i++) {
				const p1 = pts[i];
				const p2 = pts[i + 1];
				if (p1 && p2 && f >= p1.f && f <= p2.f) {
					const t = (f - p1.f) / (p2.f - p1.f);
					const ease = t * t * (3 - 2 * t); // smoothstep
					return {
						x: p1.x + (p2.x - p1.x) * ease,
						y: p1.y + (p2.y - p1.y) * ease
					};
				}
			}
			return { x: 0.55, y: 0.60 };
		};

		const focal = getFocalPoint(frameIndex);

		// Center the focal point on the screen
		let centerShift_x = canvas.width / 2 - focal.x * scaledWidth;
		let centerShift_y = canvas.height / 2 - focal.y * scaledHeight;

		// Clamp to prevent showing black edges
		centerShift_x = Math.min(0, Math.max(canvas.width - scaledWidth, centerShift_x));
		centerShift_y = Math.min(0, Math.max(canvas.height - scaledHeight, centerShift_y));

		ctx.drawImage(
			img,
			0,
			0,
			img.width,
			img.height,
			centerShift_x,
			centerShift_y,
			scaledWidth,
			scaledHeight
		);
	};

	// Global preloader on mount: creates a sparse "backbone" of frames
	// so that no matter how fast you scrub, a nearby frame is ready immediately
	useEffect(() => {
		for (let i = 1; i <= TOTAL_FRAMES; i += 8) {
			loadImage(i).catch(() => { });
		}
	}, []);

	// Main rendering loop OUTSIDE of React state
	useEffect(() => {
		let rafId: number;

		const renderLoop = () => {
			const targetFrame = targetFrameRef.current;

			// Only attempt to draw and preload if the target has changed
			if (currentFrameRef.current !== targetFrame || targetFrame === 1) {
				// 1. Try to load and draw the target frame
				loadImage(targetFrame).then((img) => {
					drawImage(img, targetFrame);
					currentFrameRef.current = targetFrame;
				}).catch(() => {
					// If target isn't loaded yet, draw the closest loaded frame as a seamless fallback
					let closestImg = null;
					let closestIdx = 1;
					let minDiff = Infinity;
					for (const [idx, img] of Array.from(imagesRef.current.entries())) {
						const diff = Math.abs(idx - targetFrame);
						if (diff < minDiff) {
							minDiff = diff;
							closestImg = img;
							closestIdx = idx;
						}
					}
					if (closestImg) {
						drawImage(closestImg, closestIdx);
					}
				});

				// 2. Progressive background preloading
				const preloadRange = 25;
				for (let i = 1; i <= preloadRange; i++) {
					const ahead = targetFrame + i;
					const behind = targetFrame - i;
					if (ahead <= TOTAL_FRAMES) loadImage(ahead).catch(() => { });
					if (behind >= 1) loadImage(behind).catch(() => { });
				}
			}

			rafId = requestAnimationFrame(renderLoop);
		};

		rafId = requestAnimationFrame(renderLoop);
		return () => cancelAnimationFrame(rafId);
	}, []);

	// Handle window resize
	useEffect(() => {
		const handleResize = () => {
			if (imagesRef.current.has(currentFrameRef.current)) {
				requestAnimationFrame(() => {
					drawImage(imagesRef.current.get(currentFrameRef.current)!, currentFrameRef.current);
				});
			}
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="w-full h-full block"
			style={{ backgroundColor: "transparent" }}
		/>
	);
}
