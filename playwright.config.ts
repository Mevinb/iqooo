import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testMatch: "*.spec.ts",
  fullyParallel: false,
  workers: 1,
  timeout: 60000,
  use: {
    baseURL: process.env.PATHWISE_TEST_URL || "http://localhost:8081",
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
    launchOptions: {
      executablePath: process.env.PATHWISE_CHROME || "/usr/bin/google-chrome",
      args: ["--no-sandbox"],
    },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  reporter: [["list"]],
});
