import { makeAutoObservable } from "mobx";
import { gameConfig } from "@/config/game";
import type { GameStartPayload } from "./SocketStore/types";

type RoundPhase = "flying" | "hit";

type DuckPose = {
	x: number;
	y: number;
	frame: 0 | 1;
};

type ActiveRound = {
	roundId: string;
	startSide: "left" | "right";
	startY: number;
	speed: number;
	duration: number;
	localStartedAt: number;
	phase: RoundPhase;
};

const initialDuckPose: DuckPose = {
	x: 0,
	y: 0,
	frame: 0,
};

const getProgress = (round: ActiveRound, now: number): number =>
	Math.min(
		1,
		Math.max(0, (now - round.localStartedAt) / (round.duration / round.speed)),
	);

const getSpriteFrame = (now: number): DuckPose["frame"] =>
	Math.floor(now / gameConfig.duck.spriteFrameMs) % 2 === 0 ? 0 : 1;

export class RoundStore {
	current: ActiveRound | null = null;
	pose: DuckPose = initialDuckPose;

	constructor() {
		makeAutoObservable(this);
	}

	get phase(): RoundPhase | null {
		return this.current?.phase ?? null;
	}

	get isFlying(): boolean {
		return this.phase === "flying";
	}

	start = ({
		roundId,
		startSide,
		startY,
		speed,
		duration,
	}: GameStartPayload) => {
		const nextRound: ActiveRound = {
			roundId,
			startSide,
			startY,
			speed,
			duration,
			localStartedAt: performance.now(),
			phase: "flying",
		};

		this.current = nextRound;
		this.pose = {
			x: startSide === "left" ? 0 : 1,
			y: startY,
			frame: 0,
		};
	};

	markHit = (): string | null => {
		if (!this.current || this.current.phase !== "flying") return null;
		this.current.phase = "hit";
		return this.current.roundId;
	};

	updateFlyingPose = (now: number): boolean => {
		const round = this.current;
		if (!round || round.phase !== "flying") return false;

		const progress = getProgress(round, now);

		this.pose = {
			x: round.startSide === "left" ? progress : 1 - progress,
			y:
				round.startY +
				Math.sin(progress * Math.PI * gameConfig.duck.flightBobCycles) *
					gameConfig.duck.flightBobAmplitude,
			frame: getSpriteFrame(now),
		};

		if (progress < 1) return true;

		this.clear(round.roundId);
		return false;
	};

	end = (roundId: string, hit: boolean) => {
		if (!this.current || this.current.roundId !== roundId) return;
		if (hit && this.current.phase === "flying") {
			this.current.phase = "hit";
			return;
		}
		if (!hit) this.clear(roundId);
	};

	clear = (roundId: string) => {
		if (this.current?.roundId !== roundId) return;
		this.current = null;
		this.pose = initialDuckPose;
	};
}
