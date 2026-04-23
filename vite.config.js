import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Le decimos al plugin de react que use la inyección automática ("automatic")
  plugins: [react({ jsxRuntime: "automatic" })],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
  },
});
