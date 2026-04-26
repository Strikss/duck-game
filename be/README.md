# be — Duck Hunt backend

Node 24 + TypeScript (ESM) + Express + socket.io. Authoritative game loop: rounds fire at random 10–30s intervals, each lasts 5s, and the server decides hit/miss.

## Install & run

```bash
pnpm install                # from repo root
pnpm --filter be dev        # watch mode (tsx)
pnpm --filter be build      # tsc → dist/
pnpm --filter be start      # node dist/index.js
pnpm --filter be typecheck
```

Port: `3001` (override with `PORT`). Health: `GET /health` → `{ ok: true }`.

## Socket events

Server → client:
- `game:start` — `{ roundId, startSide: 'left'|'right', startY: 0.1..0.7, speed: 0.8..1.3, duration, startedAt }`
- `game:end` — `{ roundId, hit: boolean }`
- `stats:update` — `{ hits, rounds }` (sent on connect and on every change)

Client → server:
- `game:hit` — `{ roundId }` (only counts if it matches the active round)

Types live in `src/events.ts` — keep FE in sync.
