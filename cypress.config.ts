import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Your application's base URL
    env: {
      locale: "en", // Default locale (change to "ar" for Arabic or any supported locale)
    },
    supportFile: "cypress/support/e2e.ts", // Path to your support file
    fixturesFolder: "cypress/fixtures", // Path to fixtures
    videosFolder: "cypress/videos", // Path to videos
    screenshotsFolder: "cypress/screenshots", // Path to screenshots
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Pattern to find test files
    viewportWidth: 1280, // Default viewport width
    viewportHeight: 720, // Default viewport height
    retries: {
      runMode: 2, // Retry failed tests in run mode
      openMode: 0, // No retries in open mode
    },
    setupNodeEvents(on, config) {
      // Add custom tasks or plugins if needed
      return config;
    },
  },
  video: true, // Enable video recording
  screenshotOnRunFailure: true, // Capture screenshots on failure
  chromeWebSecurity: false, // Disable to prevent issues with cross-origin requests
});
