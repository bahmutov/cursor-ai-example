import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import istanbul from "vite-plugin-istanbul";
import type { UserConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    istanbul({
      include: "src/*",
      exclude: ["node_modules", "cypress/**/*.cy.*"],
      extension: [".js", ".ts", ".tsx"],
      requireEnv: false,
      cypress: true,
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
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "cypress/",
        "cypress/**/*.cy.*",
        "coverage/",
        "**/*.d.ts",
        "**/*.test.ts",
        "**/*.test.tsx",
      ],
    },
  },
} as UserConfig);
