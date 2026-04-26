export const gameConfig = {
	title: "Duck Hunt",
	labels: {
		fieldRegion: "Hunting field",
		waitingForDuck: "Waiting for the next duck…",
		duckHit: "Duck hit",
		duckFlying: "Duck flying - click to shoot",
	},
	field: {
		topOffset: "7vh",
		height: "78vh",
		waitingBottomOffset: "18px",
	},
	duck: {
		heightPct: 0.14,
		hitLingerMs: 3000,
		spriteFrameMs: 150,
		flightBobAmplitude: 0.04,
		flightBobCycles: 3,
		sprites: {
			flying: ["/textures/duck-1.svg", "/textures/duck-2.svg"] as const,
			hit: "/textures/duck-3.svg",
		},
	},
	sky: {
		background: "linear-gradient(to bottom, #0f1133 0%, #d46a4a 85%)",
		sun: {
			background:
				"radial-gradient(circle at 50% 50%, #fff3c2 0%, #ffd86b 60%, rgba(255, 216, 107, 0) 72%)",
		},
		ground: {
			background: "linear-gradient(to bottom, #2a5230 0%, #10221a 100%)",
			boxShadow:
				"inset 0 2px 0 rgba(255, 255, 255, 0.12), inset 0 10px 28px rgba(0, 0, 0, 0.18)",
			pattern:
				"repeating-linear-gradient(90deg, transparent 0, transparent 18px, #091410 18px, #091410 20px)",
			shadow: "linear-gradient(to bottom, rgba(0, 0, 0, 0.22), transparent)",
			cloudTexture: "/textures/cloud.svg",
		},
		clouds: [
			{
				id: "cloud-1",
				top: "12%",
				scale: 1,
				duration: "90s",
				delay: "-20s",
				opacity: 0.95,
			},
			{
				id: "cloud-2",
				top: "22%",
				scale: 0.7,
				duration: "120s",
				delay: "-60s",
				opacity: 0.75,
			},
			{
				id: "cloud-3",
				top: "32%",
				scale: 1.2,
				duration: "140s",
				delay: "-5s",
				opacity: 0.95,
			},
			{
				id: "cloud-4",
				top: "6%",
				scale: 0.55,
				duration: "150s",
				delay: "-90s",
				opacity: 0.85,
			},
			{
				id: "cloud-5",
				top: "45%",
				scale: 0.9,
				duration: "110s",
				delay: "-35s",
				opacity: 0.8,
			},
		] as const,
	},
} as const;

export const duckSprite = (phase: "flying" | "hit", frame: 0 | 1) =>
	phase === "hit"
		? gameConfig.duck.sprites.hit
		: gameConfig.duck.sprites.flying[frame];
