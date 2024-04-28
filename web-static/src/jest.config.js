module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/support/setupTests.js"],
	testMatch: ["<rootDir>/src/**/*.test.tsx"],
};
