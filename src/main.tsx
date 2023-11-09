import React from "react";
import ReactDOM from "react-dom/client";
import Index from "./pages";
import "@/styles/global.css";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
);
