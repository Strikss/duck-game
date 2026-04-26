export const EVENTS = {
  GAME_START: 'game:start',
  GAME_END: 'game:end',
  STATS_UPDATE: 'stats:update',
  GAME_HIT: 'game:hit',
  GAME_READY: 'game:ready',
} as const;

export interface GameStartPayload {
  roundId: string;
  startSide: 'left' | 'right';
  startY: number;
  speed: number;
  duration: number;
  startedAt: number;
}
export interface GameEndPayload { roundId: string; hit: boolean; }
export interface StatsPayload   { hits: number; rounds: number; started: boolean; }
export interface GameHitPayload { roundId: string; }
