module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  watch:false,
  collectCoverage: true,
  coverageDirectory: 'coverage',
 
  coverageReporters: [
    "json-summary",
    "text",
    "lcov"
  ]
 
};