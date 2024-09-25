import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import GlobalState from "@/context/GlobalState";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalState>
      <App />
    </GlobalState>
  </StrictMode>
);
