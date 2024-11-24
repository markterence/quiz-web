// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // The path to a module that runs some code to configure or set up the testing framework before each test
  setupTestFrameworkScriptFile: '<rootDir>/tests/setup.js',

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  //  \"tests/integration/**/.*\\.(test|spec)\\.js\"
  testMatch: [
    '<rootDir>/tests/integration/**/?(*.)(spec|test).js?(x)',
    '<rootDir>/tests/unit/**/?(*.)(spec|test).js?(x)'
    // "**/__tests__/**/*.js?(x)",
    // "**/?(*.)+(spec|test).js?(x)"
  ]
}
