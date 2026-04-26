import { useEffect } from "react";
import { gameConfig } from "@/config/game";
import type { RoundStore } from "@/stores/RoundStore";

export function useDuckRoundLifecycle(round: RoundStore) {
	const phase = round.phase;
	const roundId = round.current?.roundId;

	useEffect(() => {
		if (phase !== "flying") return;

		let rafId = 0;

		const tick = () => {
			const shouldContinue = round.updateFlyingPose(performance.now());
			if (shouldContinue) rafId = requestAnimationFrame(tick);
		};

		rafId = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(rafId);
		};
	}, [phase, round]);

	useEffect(() => {
		if (phase !== "hit" || !roundId) return;

		const timeoutId = window.setTimeout(() => {
			round.clear(roundId);
		}, gameConfig.duck.hitLingerMs);

		return () => clearTimeout(timeoutId);
	}, [phase, round, roundId]);
}
