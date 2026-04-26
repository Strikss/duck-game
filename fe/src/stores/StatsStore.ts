import { makeAutoObservable } from "mobx";
import type { StatsUpdatePayload } from "./SocketStore/types";

export class StatsStore {
	hits = 0;
	rounds = 0;
	started = false;

	constructor() {
		makeAutoObservable(this);
	}

	get accuracy(): number {
		return this.rounds > 0 ? Math.round((this.hits / this.rounds) * 100) : 0;
	}

	set = (payload: StatsUpdatePayload) => {
		this.hits = payload.hits;
		this.rounds = payload.rounds;
		this.started = payload.started;
	};
}
