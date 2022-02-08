module.exports = {
  verbose: true,
  preset: '@testing-library/react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
  },
  setupFiles: ['./jest.setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  timers: 'fakfe',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '/node_modules/(?!@react-native|react-native|redux-persist-sensitive-storage|mixpanel-react-native)',
  ],
};
