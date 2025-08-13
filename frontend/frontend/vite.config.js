import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    fs: {
      allow: ['.'], // Permite acesso a todos os arquivos do projeto, incluindo `src/`
    },
  },
  plugins: [react(), tailwindcss()],
});
