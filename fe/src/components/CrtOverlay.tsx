export function CrtOverlay() {
	return (
		<>
			<div
				className="absolute inset-0 pointer-events-none z-[49]"
				style={{
					background:
						"radial-gradient(circle at 50% 15%, rgba(255, 200, 140, 0.12), transparent 55%)",
				}}
			/>
			<div
				className="absolute inset-0 pointer-events-none z-[50] mix-blend-multiply"
				style={{
					background:
						"repeating-linear-gradient(to bottom, rgba(0,0,0,0.18) 0, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px), radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
				}}
			/>
		</>
	);
}
