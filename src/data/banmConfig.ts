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
			label: "COMP-01 // FOV",
			description: "RasPi Cam 3 NoIR Wide, providing 120 degree field of view, ensuring the BANM can see everything in front of it.",
		},
		{
			id: "loc-2",
			frameStart: 256,
			frameEnd: 275,
			x: 0.45,
			y: 0.55,
			label: "SENS-04 // IMU ARRAY",
			description: "Tactical-grade inertial navigation. Drift rate: [SPEC: DEG/HR].",
		},
		{
			id: "loc-3",
			frameStart: 276,
			frameEnd: 300,
			x: 0.65,
			y: 0.70,
			label: "PWR-02 // THERMAL CORE",
			description: "Active thermal management system sustaining operations up to 60°C ambient.",
		},
	],
};
