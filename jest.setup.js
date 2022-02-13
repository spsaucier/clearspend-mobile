import 'react-native-gesture-handler/jestSetup';
import 'react-native-reanimated';
import { setLogger } from 'react-query';

global.__reanimatedWorkletInit = jest.fn();

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});

// uncomment to disable all logs
// global.console = {
//   log: jest.fn(),
//   error: jest.fn(),
//   warn: jest.fn(),
//   info: jest.fn(),
//   debug: jest.fn(),
// };

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-permissions', () => require('react-native-permissions/mock'));

jest.mock('mixpanel-react-native', () => ({
  __esModule: true,
  default: () => jest.fn(),
  Mixpanel: jest.fn(() => ({
    init: jest.fn(),
  })),
}));

jest.mock('react-native-mmkv', () => ({
  __esModule: true,
  useMMKVString: jest.fn().mockReturnValue([{ setAvailableBio: () => {} }]),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

jest.mock('react-native-sensitive-info', () => ({
  setItem: jest.fn(),
}));
