import { observer } from "mobx-react-lite";

import { CrtOverlay } from "@/components/CrtOverlay";
import { GameField } from "@/components/GameField";
import { HUD } from "@/components/HUD";
import { Sky } from "@/components/Sky";
import { StartGameOverlay } from "@/components/StartGameOverlay";

import { rootStore } from "@/stores";

export const App = observer(function App() {
	const { socket, stats } = rootStore;
	const shouldShowStartGameOverlay = socket.status === "connected" && !stats.started;

	const handleStartGame = () => {
		socket.startGame();
	};

	return (
		<div className="relative w-screen h-screen overflow-hidden isolate">
			<Sky />
			<HUD />
			<GameField />
			{shouldShowStartGameOverlay && <StartGameOverlay onStartGame={handleStartGame} />}
			<CrtOverlay />
		</div>
	);
});
