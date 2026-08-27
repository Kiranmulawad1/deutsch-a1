import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { themeCSS } from "./theme.js";

const reset = `
* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
html, body, #root { height: 100%; margin: 0; padding: 0; }
body {
  background: var(--c-paper);
  color: var(--c-ink);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  overscroll-behavior-y: none;
}
button { font: inherit; cursor: pointer; }
/* 16px minimum or iOS zooms the page when an input takes focus */
input, textarea, select { font: inherit; font-size: 16px; }
:focus-visible { outline: 2px solid var(--c-plum); outline-offset: 2px; }
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .25; }
}
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}
`;

const style = document.createElement("style");
style.textContent = themeCSS + reset;
document.head.appendChild(style);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
