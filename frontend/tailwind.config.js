// Configuração do Tailwind CSS - framework de estilos usado nas telas
// O campo "content" seleciona quais arquivos o Tailwind deve escanear para gerar os estilos
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        marca: {
          50:  "#fefce8",
          100: "#fef9c3",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          900: "#713f12",
        },
      },
    },
  },
  plugins: [],
};
