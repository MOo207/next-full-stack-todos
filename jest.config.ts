import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm", // Use ts-jest for TypeScript and ESM
  testEnvironment: "jsdom", // Use jsdom for browser-like testing environment
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true, // Enable ESM for ts-jest
      },
    ],
  },
  moduleNameMapper: {
    // Map module aliases from tsconfig.json
    "^@/(.*)$": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Include setup for TextEncoder polyfill
  transformIgnorePatterns: [
    "node_modules/(?!(your-esm-package-name|another-esm-package)/)", // Replace "your-esm-package-name" with any specific ESM dependencies
  ],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"], // Ignore node_modules and build directories
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // Supported file extensions
  collectCoverage: true, // Enable coverage collection
  coverageDirectory: "<rootDir>/coverage", // Output directory for coverage reports
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"], // Ignore specific paths for coverage
  verbose: true, // Show detailed test information
};

export default config;
