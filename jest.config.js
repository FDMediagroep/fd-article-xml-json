module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
    coverageDirectory: 'js-coverage',
    coverageReporters: ['lcov', 'text'],
};