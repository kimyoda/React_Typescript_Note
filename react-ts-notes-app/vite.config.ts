import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // path 모듈을 import합니다.

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      components: path.resolve(__dirname, "./src/components"),
      services: path.resolve(__dirname, "./src/services"),
      types: path.resolve(__dirname, "./src/types"),
    },
  },
});
