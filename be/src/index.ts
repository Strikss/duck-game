import { createServer } from 'node:http';
import cors from 'cors';
import express from 'express';
import { Server as SocketServer } from 'socket.io';
import { EVENTS, type GameHitPayload } from './events.js';
import { GameManager } from './game.js';

const PORT = Number(process.env.PORT) || 3001;
const CORS_ORIGINS = ['http://localhost:5173', 'http://localhost:4173'];

const app = express();
app.use(cors({ origin: CORS_ORIGINS }));

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

const httpServer = createServer(app);
const io = new SocketServer(httpServer, {
  cors: { origin: CORS_ORIGINS },
});

const gameManager = new GameManager((event, payload) => {
  io.emit(event, payload);
});

io.on('connection', (socket) => {
  console.log(`[io] connect id=${socket.id}`);
  socket.emit(EVENTS.STATS_UPDATE, gameManager.getStats());

  socket.on(EVENTS.GAME_HIT, (payload: GameHitPayload) => {
    if (payload && typeof payload.roundId === 'string') {
      gameManager.handleHit(payload.roundId);
    }
  });

  socket.on(EVENTS.GAME_READY, () => {
    gameManager.start();
  });

  socket.on('disconnect', (reason) => {
    console.log(`[io] disconnect id=${socket.id} reason=${reason}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`[server] listening on :${PORT}`);
});

const shutdown = (signal: string) => {
  console.log(`[server] ${signal} received, shutting down`);
  gameManager.stop();
  io.close(() => {
    httpServer.close(() => {
      process.exit(0);
    });
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
