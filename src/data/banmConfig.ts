export const banmConfig = {
	totalFrames: 300,
	translucentStartFrame: 238,

	infoCallouts: [
		{
			id: "info-1",
			frameStart: 10,
			frameEnd: 80,
			title: "MULTI-DOMAIN AUTONOMY",
			description:
				"Platform-agnostic neural engine designed for contested environments. [SPEC: ADD FLIGHT HOURS] operational flight hours logged in GPS-denied combat zones.",
		},
		{
			id: "info-2",
			frameStart: 90,
			frameEnd: 160,
			title: "FORM FACTOR",
			description:
				"Low-signature, aerodynamically optimized casing. Engineered for rapid integration onto Group 3-5 UAS platforms via standard hardpoints.",
		},
		{
			id: "info-3",
			frameStart: 170,
			frameEnd: 235,
			title: "DEPLOYMENT CONCEPT",
			description:
				"Hot-swappable edge compute. Zero field-calibration required. Boot-to-deploy in under [SPEC: SECONDS] seconds.",
		},
	],

	locateCallouts: [
		{
			id: "loc-1",
			frameStart: 240,
			frameEnd: 255,
			x: 0.78,
			y: 0.675,
			label: "STATE 01",
			description: "GPS Nominal",
		},
		{
			id: "loc-2",
			frameStart: 256,
			frameEnd: 275,
			x: 0.45,
			y: 0.55,
			label: "STATE 02",
			description: "GPS Jammed",
		},
		{
			id: "loc-3",
			frameStart: 276,
			frameEnd: 285,
			x: 0.65,
			y: 0.70,
			label: "STATE 03",
			description: "Dead Reckoning",
		},
		{
			id: "loc-4",
			frameStart: 286,
			frameEnd: 300,
			x: 0.55,
			y: 0.60,
			label: "STATE 04",
			description: "GPS Restored",
		},
	],
};
