import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import istanbul from "vite-plugin-istanbul";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  build: {
    sourcemap: true,
  },
  server: {
    open: false,
    // no need to hot reload in CI
    hmr: process.env.CI ? false : true,
    watch: {
      ignored: ["node_modules", "cypress", "cypress/**/*.cy.*", "coverage"],
    },
  },
});
