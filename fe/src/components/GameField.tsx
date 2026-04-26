import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Duck } from "@/components/Duck";
import { gameConfig } from "@/config/game";
import { rootStore } from "@/stores";

export const GameField = observer(function GameField() {
	const { round } = rootStore;
	const [flashKey, setFlashKey] = useState(0);
	const triggerFlash = () => setFlashKey((k) => k + 1);

	return (
		<main
			className="absolute left-0 w-screen overflow-hidden cursor-crosshair z-10"
			style={{
				top: gameConfig.field.topOffset,
				height: gameConfig.field.height,
			}}
			aria-label={gameConfig.labels.fieldRegion}
		>
			{round.current && <Duck onHitFlash={triggerFlash} />}
			{flashKey > 0 && (
				<div
					key={flashKey}
					className="absolute inset-0 bg-white pointer-events-none animate-flash z-30"
					aria-hidden="true"
				/>
			)}
			{!round.current && (
				<div
					className="absolute left-1/2 pointer-events-none z-[15] animate-float-idle"
					style={{ bottom: gameConfig.field.waitingBottomOffset }}
					aria-live="polite"
				>
					<div className="font-mono text-xs tracking-[0.14em] uppercase text-[rgba(17,23,33,0.75)] bg-white/65 border border-[rgba(17,23,33,0.08)] px-3.5 py-[7px] rounded-full backdrop-blur-md">
						{gameConfig.labels.waitingForDuck}
					</div>
				</div>
			)}
		</main>
	);
});
