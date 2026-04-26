import { makeAutoObservable } from "mobx";
import { io } from "socket.io-client";
import type { RoundStore } from "../RoundStore";
import type { StatsStore } from "../StatsStore";
import type { ConnectionStatus, GameSocket } from "./types";

const BE_URL = import.meta.env.VITE_BE_URL ?? "http://localhost:3001";

export class SocketStore {
	status: ConnectionStatus = "connecting";
	private socket: GameSocket | null = null;

	constructor(
		private readonly round: RoundStore,
		private readonly stats: StatsStore,
	) {
		makeAutoObservable<this, "socket">(this, { socket: false });
	}

	connect = () => {
		if (this.socket) return;
		this.status = "connecting";

		const socket: GameSocket = io(BE_URL, {
			transports: ["websocket", "polling"],
			reconnection: true,
		});
		this.socket = socket;

		socket.on("connect", () => {
			this.status = "connected";
		});
		socket.on("disconnect", () => {
			this.status = "disconnected";
		});
		socket.on("connect_error", () => {
			this.status = "disconnected";
		});

		socket.on("stats:update", this.stats.set);
		socket.on("game:start", this.round.start);
		socket.on("game:end", ({ roundId, hit }) =>
			this.round.end(roundId, hit),
		);
	};

	disconnect = () => {
		this.socket?.off();
		this.socket?.disconnect();
		this.socket = null;
	};

	sendHit = (roundId: string) => {
		this.socket?.emit("game:hit", { roundId });
	};

	startGame = () => {
		this.socket?.emit("game:ready");
	};
}
