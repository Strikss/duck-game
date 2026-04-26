# Duck Hunt Game

Browser Duck Hunt: backend broadcasts game-start events via Socket.io; frontend animates the duck with React + MobX + Tailwind, plays sounds, and tracks hits.

## Layout

```
duck-game/
├── fe/   # Vite + React + TypeScript + MobX + Tailwind (client)
└── be/   # Node + TypeScript + Express + Socket.io (server)
```

`fe/` and `be/` are pnpm workspace packages and can still be run individually.

## Run

```bash
pnpm install
pnpm dev
```

Backend runs on `http://localhost:3001`; frontend runs on `http://localhost:5173`.

## Gameplay

A duck flies across the screen every 10–30s. Click to shoot — the server is authoritative on hits and rounds. `quack.mp3` plays during flight, `awp.mp3` on hit.

## Assignment

### Technologies

- React
- Redux, Flux, or MobX
- Any library for playing sounds
- HTML, CSS, or canvas for animation

### Requirements

1. Develop a Duck Hunt game.
2. The goal is to hit the duck by moving the mouse cursor over it and clicking the left mouse button.
3. The game starts automatically every 10 seconds. The duck flies from left to right for 5 seconds, and the starting point is selected randomly.
4. While the duck is flying, play `quack.mp3`. When the duck is hit, play `awp.mp3`.
5. During flight, duck textures 1 and 2 should animate. When the duck is hit, the image changes to texture 3 and disappears after 3 seconds.
6. Display a counter on the game field with the number of rounds and hits. For example, `3 / 5` means 5 games were started and the user hit the duck 3 times.

### Bonus

- The game starts automatically approximately every 20 seconds, with a variation of +/- 10 seconds.
- Flight direction and speed are selected randomly. One possible implementation is to provide several predefined variants.
- Write a basic Node.js server using Socket.io and implement game-start logic on the backend with frontend notifications.
