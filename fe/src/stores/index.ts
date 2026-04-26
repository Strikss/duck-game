import { RoundStore } from "./RoundStore";
import { SocketStore } from "./SocketStore";
import { StatsStore } from "./StatsStore";

class RootStore {
	readonly round = new RoundStore();
	readonly stats = new StatsStore();
	readonly socket = new SocketStore(this.round, this.stats);
}

export const rootStore = new RootStore();
