type StartGameOverlayProps = {
	onStartGame: () => void;
};

export function StartGameOverlay({ onStartGame }: StartGameOverlayProps) {
	return (
		<div
			role="dialog"
			aria-label="Start game"
			className="fixed inset-0 grid place-items-center z-[100] animate-crt-on"
			style={{
				background:
					"radial-gradient(circle at center, rgba(9, 13, 26, 0.8), rgba(9, 13, 26, 0.95))",
			}}
		>
			<button
				type="button"
				onClick={onStartGame}
				className="relative text-center text-hud-text px-11 py-8 bg-panel-bg"
				style={{
					border: "4px solid #ffc83a",
					boxShadow:
						"inset 0 0 0 4px #090d1a, inset 0 0 0 8px #9a6b10, 0 0 0 4px #000, 0 0 28px rgba(255, 200, 58, 0.18)",
					imageRendering: "pixelated",
				}}
			>
				<div className="font-display text-sm leading-relaxed tracking-[0.04em] text-accent-gold drop-shadow-[2px_2px_0_#000]">
					Click anywhere to start the hunt
				</div>
				<div className="mt-3.5 font-body text-xl text-hud-mute tracking-[0.06em]">
					Press start to launch the first round
				</div>
			</button>
		</div>
	);
}
