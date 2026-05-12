// ============================================================
// PONTO DE ENTRADA DO REACT - main.jsx
// ============================================================
// Ele monta o componente App dentro da div #root do index.html.
// ============================================================
import React from "react";
import ReactDOM from "react-dom/client";
import { TemaProvider } from "./contexts/TemaContext.jsx";
import App from "./App.jsx";
import "./index.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TemaProvider>
      <App />
    </TemaProvider>
  </React.StrictMode>
);
