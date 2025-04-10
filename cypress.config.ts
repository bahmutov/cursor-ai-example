import { defineConfig } from "cypress";
import cypressMap from "cypress-map/commands";

export default defineConfig({
  defaultBrowser: "electron",
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.ts",
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      cypressMap(on, config);
      return config;
    },
  },
});
