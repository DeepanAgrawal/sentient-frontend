// jest.config.js (CommonJS syntax)
module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest', // Ensure Babel is handling JS/TS transformations
  },
  testEnvironment: 'jsdom', // Or 'node' depending on your use case
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
};
