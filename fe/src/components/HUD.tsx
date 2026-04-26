import { observer } from "mobx-react-lite";
import { gameConfig } from "@/config/game";
import { rootStore } from "@/stores";
import type { ConnectionStatus } from "@/stores/SocketStore/types";

const statusLabel: Record<ConnectionStatus, string> = {
	connecting: "Connecting",
	connected: "Online",
	disconnected: "Offline",
};

const dotColor: Record<ConnectionStatus, string> = {
	connecting: "bg-accent-gold animate-pulse-soft",
	connected: "bg-accent-green",
	disconnected: "bg-accent-red",
};

export const HUD = observer(function HUD() {
	const { stats, socket } = rootStore;

	return (
		<header
			className="absolute top-3 left-3 right-3 h-[calc(7vh-12px)] flex items-center justify-between gap-3 px-[18px] rounded-full bg-hud-bg text-hud-text border border-hud-border shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-md z-20 select-none"
			style={{ backdropFilter: "blur(12px) saturate(140%)" }}
		>
			<div className="flex items-center min-w-[140px] max-sm:min-w-0">
				<span className="font-mono text-sm font-bold tracking-[0.24em] uppercase text-hud-accent drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
					{gameConfig.title}
				</span>
			</div>

			<div
				className="flex items-center gap-3 font-mono text-lg font-semibold tracking-[0.06em]"
				aria-live="polite"
			>
				<span className="text-lg leading-none" aria-hidden="true">
					🎯
				</span>
				<span className="inline-flex items-baseline gap-1.5">
					<span className="text-hud-accent tabular-nums">
						{stats.hits.toString().padStart(2, "0")}
					</span>
					<span className="opacity-45 font-normal">/</span>
					<span className="opacity-85 tabular-nums">
						{stats.rounds.toString().padStart(2, "0")}
					</span>
				</span>
				<span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/[0.08] border border-white/[0.08] opacity-90 max-sm:hidden">
					{stats.accuracy}%
				</span>
			</div>

			<div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.08em] uppercase opacity-85 min-w-[140px] justify-end max-sm:min-w-0">
				<span
					className={`size-[9px] rounded-full shadow-[0_0_0_3px_rgba(255,255,255,0.06)] ${dotColor[socket.status]}`}
					aria-hidden="true"
				/>
				<span>{statusLabel[socket.status]}</span>
			</div>
		</header>
	);
});
