import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/App";
import { rootStore } from "@/stores";
import "@/index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element #root not found");

rootStore.socket.connect();

createRoot(root).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
