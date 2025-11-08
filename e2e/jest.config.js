module.exports = {
  rootDir: '..',
  testMatch: ['**/?(*.)+(e2e).[jt]s?(x)'],
  testTimeout: 120000,
  maxWorkers: 1,

  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  testEnvironment: 'detox/runners/jest/testEnvironment',
  reporters: ['detox/runners/jest/reporter'],

  verbose: true,
};
