import { gameConfig } from "@/config/game";

export function Sky() {
	return (
		<div
			className="absolute inset-0 overflow-hidden z-0"
			style={{ background: gameConfig.sky.background }}
			aria-hidden="true"
		>
			<div
				className="absolute top-[8%] right-[10%] size-[110px] rounded-full opacity-85 pointer-events-none blur-[0.5px]"
				style={{ background: gameConfig.sky.sun.background }}
			/>
			{gameConfig.sky.clouds.map((c) => (
				<div
					key={c.id}
					className="absolute w-[180px] h-[70px] pointer-events-none animate-drift will-change-transform"
					style={{
						top: c.top,
						transform: `scale(${c.scale})`,
						animationDuration: c.duration,
						animationDelay: c.delay,
						opacity: c.opacity,
						filter: "drop-shadow(0 4px 12px rgba(30, 60, 100, 0.12))",
					}}
				>
					<img
						src={gameConfig.sky.ground.cloudTexture}
						alt=""
						className="w-full h-full block"
					/>
				</div>
			))}
			<div
				className="absolute left-0 right-0 bottom-0 h-[15vh] overflow-hidden"
				style={{
					background: gameConfig.sky.ground.background,
					boxShadow: gameConfig.sky.ground.boxShadow,
				}}
			>
				<div
					className="absolute inset-0 opacity-60 mix-blend-multiply"
					style={{ backgroundImage: gameConfig.sky.ground.pattern }}
				/>
				<div
					className="absolute top-0 left-0 right-0 h-[14px]"
					style={{ background: gameConfig.sky.ground.shadow }}
				/>
			</div>
		</div>
	);
}
