import type { Socket } from "socket.io-client";

export type ConnectionStatus = "connecting" | "connected" | "disconnected";

export type GameStartPayload = {
	roundId: string;
	startSide: "left" | "right";
	startY: number;
	speed: number;
	duration: number;
	startedAt: number;
};

type GameEndPayload = {
	roundId: string;
	hit: boolean;
};

export type StatsUpdatePayload = {
	hits: number;
	rounds: number;
	started: boolean;
};

type GameHitPayload = {
	roundId: string;
};

type ServerToClientEvents = {
	"game:start": (payload: GameStartPayload) => void;
	"game:end": (payload: GameEndPayload) => void;
	"stats:update": (payload: StatsUpdatePayload) => void;
};

type ClientToServerEvents = {
	"game:hit": (payload: GameHitPayload) => void;
	"game:ready": () => void;
};

export type GameSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
