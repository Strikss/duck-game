import { useState } from "react";
import { observer } from "mobx-react-lite";
import { CrtOverlay } from "@/components/CrtOverlay";
import { GameField } from "@/components/GameField";
import { HUD } from "@/components/HUD";
import { Sky } from "@/components/Sky";
import { SoundGate } from "@/components/SoundGate";
import { useSounds } from "@/hooks/useSounds";
import { rootStore } from "@/stores";

export const App = observer(function App() {
	const { socket, stats } = rootStore;
	const [playQuack, { stop: stopQuack }] = useSounds("quack");
	const [soundEnabled, setSoundEnabled] = useState(false);
	const shouldShowSoundGate =
		!soundEnabled && socket.status === "connected" && !stats.started;

	const enableSound = () => {
		if (soundEnabled) return;
		playQuack();
		stopQuack();
		setSoundEnabled(true);
		socket.startGame();
	};

	return (
		<div className="relative w-screen h-screen overflow-hidden isolate">
			<Sky />
			<HUD />
			<GameField />
			{shouldShowSoundGate && <SoundGate onEnableSound={enableSound} />}
			<CrtOverlay />
		</div>
	);
});
