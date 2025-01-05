const { TestEnvironment } = require("jest-environment-jsdom");

module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest'
    },
    moduleNameMapper: {
      "\\.(css|less)$": "identity-obj-proxy",
    },
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    transformIgnorePatterns: [
        '/node_modules/(?!(antd|@ant-design|@babel|jest-runtime)/)' 
      ],
      extensionsToTreatAsEsm: ['.jsx'],
  };