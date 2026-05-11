// Configuração do Vite — ferramenta que compila e serve o frontend React
// Em desenvolvimento, o proxy redireciona /api para o backend na porta 3000
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Porta do frontend em desenvolvimento local
    proxy: {
      // Redireciona chamadas /api para o backend Express durante o desenvolvimento
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
