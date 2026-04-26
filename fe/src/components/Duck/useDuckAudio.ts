import { useEffect } from "react";
import { useSounds } from "@/hooks/useSounds";

const quackOptions = {
	loop: true,
	interrupt: true,
} as const;

export function useDuckAudio(isFlying: boolean) {
	const [playQuack, { stop: stopQuack }] = useSounds("quack", quackOptions);
	const [playAwp] = useSounds("awp", { interrupt: true });

	useEffect(() => {
		if (!isFlying) {
			stopQuack();
			return;
		}

		playQuack();
		return () => stopQuack();
	}, [isFlying, playQuack, stopQuack]);

	return {
		playHitSound: playAwp,
		stopFlyingSound: stopQuack,
	};
}
