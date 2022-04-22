const presets = ['module:metro-react-native-babel-preset'];
const plugins = [];

plugins.push([
  'module-resolver',
  {
    root: ['./src'],
    extensions: ['.js', '.json', '.ts', '.tsx'],
    alias: {
      '@': './src',
    },
  },
  '@fullstory/react-native',
], 'react-native-reanimated/plugin');

module.exports = {
  presets,
  plugins,
};
