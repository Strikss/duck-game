import { observer } from "mobx-react-lite";
import type { CSSProperties, MouseEvent } from "react";
import { duckSprite, gameConfig } from "@/config/game";
import { rootStore } from "@/stores";
import { useDuckAudio } from "./useDuckAudio";
import { useDuckRoundLifecycle } from "./useDuckRoundLifecycle";

type DuckProps = {
	onHitFlash: () => void;
};

type DuckStyle = CSSProperties & {
	"--duck-offset-x": string;
};

const duckClassName = [
	"absolute w-[11%] max-w-[140px] min-w-[80px] aspect-square p-0 border-0 bg-transparent",
	"cursor-crosshair origin-center will-change-transform",
	"drop-shadow-[0_8px_14px_rgba(0,0,0,0.22)] transition-[filter] duration-200",
	"hover:drop-shadow-[0_10px_18px_rgba(0,0,0,0.3)] hover:brightness-105",
].join(" ");

export const Duck = observer(function Duck({ onHitFlash }: DuckProps) {
	const { round, socket } = rootStore;
	const { playHitSound, stopFlyingSound } = useDuckAudio(round.isFlying);

	useDuckRoundLifecycle(round);

	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const hitRoundId = round.markHit();
		if (!hitRoundId) return;

		stopFlyingSound();
		playHitSound();
		onHitFlash();
		socket.sendHit(hitRoundId);
	};

	if (!round.current) return null;

	const { phase, startSide } = round.current;
	const { x, y, frame } = round.pose;
	const isHit = phase === "hit";
	const duckOffsetX = `${x * 100 - 100}%`;
	const style: DuckStyle = {
		left: `${x * 100}%`,
		top: `${y * (1 - gameConfig.duck.heightPct) * 100}%`,
		"--duck-offset-x": duckOffsetX,
		transform: "translateX(var(--duck-offset-x))",
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			style={style}
			aria-label={isHit ? gameConfig.labels.duckHit : gameConfig.labels.duckFlying}
			className={
				isHit
					? `${duckClassName} pointer-events-none cursor-default animate-duck-hit`
					: duckClassName
			}
		>
			<img
				src={duckSprite(phase, frame)}
				alt=""
				draggable={false}
				style={{ transform: `scaleX(${startSide === "right" ? -1 : 1})` }}
				className="w-full h-full block pointer-events-none"
			/>
		</button>
	);
});
