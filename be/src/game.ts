import { randomUUID } from 'node:crypto';
import {
  EVENTS,
  type GameStartPayload,
  type GameEndPayload,
  type StatsPayload,
} from './events.js';

type BroadcastEvent =
  | typeof EVENTS.GAME_START
  | typeof EVENTS.GAME_END
  | typeof EVENTS.STATS_UPDATE;

type BroadcastPayload = GameStartPayload | GameEndPayload | StatsPayload;

export type Broadcast = (event: BroadcastEvent, payload: BroadcastPayload) => void;

type ActiveRound = GameStartPayload & { hitReceived: boolean };

const ROUND_DURATION_MS = 5000;
const ROUND_END_GRACE_MS = 50;
const FIRST_ROUND_DELAY_MS = 3000;
const MIN_GAP_MS = 10_000;
const MAX_GAP_MS = 30_000;

export class GameManager {
  private started = false;
  private hits = 0;
  private rounds = 0;
  private currentRound: ActiveRound | null = null;
  private roundTimer: NodeJS.Timeout | null = null;
  private scheduleTimer: NodeJS.Timeout | null = null;

  constructor(private readonly broadcast: Broadcast) {}

  start(): void {
    if (this.started) return;

    this.started = true;
    this.broadcast(EVENTS.STATS_UPDATE, this.getStats());

    this.clearScheduleTimer();
    this.scheduleTimer = setTimeout(() => {
      this.scheduleTimer = null;
      this.startRound();
    }, FIRST_ROUND_DELAY_MS);
  }

  stop(): void {
    this.started = false;
    this.clearScheduleTimer();
    this.clearRoundTimer();
    this.currentRound = null;
  }

  getStats(): StatsPayload {
    return { hits: this.hits, rounds: this.rounds, started: this.started };
  }

  handleHit(roundId: string): void {
    const round = this.currentRound;
    if (!round || round.hitReceived || round.roundId !== roundId) return;

    round.hitReceived = true;
    this.hits += 1;
    console.log(`[game] hit round=${roundId} hits=${this.hits}`);

    this.broadcast(EVENTS.STATS_UPDATE, this.getStats());
    this.broadcast(EVENTS.GAME_END, { roundId, hit: true });

    this.clearRoundTimer();
    this.currentRound = null;
    this.scheduleNext();
  }

  private scheduleNext(): void {
    this.clearScheduleTimer();
    const delay = MIN_GAP_MS + Math.floor(Math.random() * (MAX_GAP_MS - MIN_GAP_MS + 1));
    this.scheduleTimer = setTimeout(() => {
      this.scheduleTimer = null;
      this.startRound();
    }, delay);
  }

  private startRound(): void {
    if (this.currentRound !== null) return;

    const payload: GameStartPayload = {
      roundId: randomUUID(),
      startSide: Math.random() < 0.5 ? 'left' : 'right',
      startY: 0.1 + Math.random() * 0.6,
      speed: 0.8 + Math.random() * 0.5,
      duration: ROUND_DURATION_MS,
      startedAt: Date.now(),
    };

    this.rounds += 1;
    this.currentRound = { ...payload, hitReceived: false };

    console.log(
      `[game] round start id=${payload.roundId} side=${payload.startSide} y=${payload.startY.toFixed(2)} speed=${payload.speed.toFixed(2)}`,
    );

    this.broadcast(EVENTS.GAME_START, payload);
    this.broadcast(EVENTS.STATS_UPDATE, this.getStats());

    this.clearRoundTimer();
    this.roundTimer = setTimeout(() => {
      this.roundTimer = null;
      this.endRound(false);
    }, payload.duration + ROUND_END_GRACE_MS);
  }

  private endRound(hit: boolean): void {
    const round = this.currentRound;
    if (!round) return;

    console.log(`[game] round end id=${round.roundId} hit=${hit}`);
    this.broadcast(EVENTS.GAME_END, { roundId: round.roundId, hit });

    this.clearRoundTimer();
    this.currentRound = null;
    this.scheduleNext();
  }

  private clearRoundTimer(): void {
    if (this.roundTimer) {
      clearTimeout(this.roundTimer);
      this.roundTimer = null;
    }
  }

  private clearScheduleTimer(): void {
    if (this.scheduleTimer) {
      clearTimeout(this.scheduleTimer);
      this.scheduleTimer = null;
    }
  }
}
