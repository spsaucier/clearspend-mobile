import 'react-native-gesture-handler/jestSetup';
import 'react-native-reanimated';
import { setLogger } from 'react-query';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

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

jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(() => true),
  useNavigation: () => ({
    reset: jest.fn(),
  }),
}));

jest.mock('react-native-safe-area-context', () => ({
  ...mockSafeAreaContext,
  useSafeAreaInsets: () => ({
    bottom: 0,
  }),
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  useBottomTabBarHeight: () => 0,
}));

jest.mock('@gorhom/bottom-sheet', () => {
  const RN = require('react-native');

  return {
    __esModule: true,
    ...require('@gorhom/bottom-sheet/mock'),
    // BottomSheetComponent mock throws an error so override as follows
    BottomSheetView: RN.View,
    BottomSheetScrollView: RN.ScrollView,
    BottomSheetSectionList: RN.SectionList,
    BottomSheetFlatList: RN.FlatList,
    BottomSheetVirtualizedList: RN.VirtualizedList,
  };
});

jest.mock('react-native-device-info', () => ({
  getVersion: jest.fn(() => '1.0'),
  getBuildNumber: jest.fn(() => 10),
}));

jest.mock('@fullstory/react-native', () => ({
  LogLevel: {
    Info: 'info',
    Warn: 'warn',
    Error: 'error',
  },
  event: jest.fn(),
  setUserVars: jest.fn(),
  restart: jest.fn(),
  identify: jest.fn(),
  log: jest.fn(),
  onReady: jest.fn(),
}));

jest.mock('@react-navigation/core', () => {
  const actualNav = jest.requireActual('@react-navigation/core');
  return {
    ...actualNav,
    useFocusEffect: jest.fn(),
    useNavigation: () => ({
      navigate: jest.fn(() => ({
        goBack: jest.fn(),
        replace: jest.fn(),
        navigate: jest.fn(),
      })),
    }),
  };
});

jest.mock('@react-native-cookies/cookies', () => ({
  clearAll: jest.fn(),
}));

jest.mock('mixpanel-react-native', () => ({
  __esModule: true,
  default: () => jest.fn(),
  Mixpanel: jest.fn(() => ({
    init: jest.fn(),
  })),
}));

jest.mock('launchdarkly-react-native-client-sdk', () => ({
  __esModule: true,
  default: () => jest.fn(),
  Mixpanel: jest.fn(() => ({
    init: jest.fn(),
  })),
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
  Trans: ({ children, components }) => {
    return children || components.key || components.key1;
  },
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  canOpenURL: jest.fn().mockResolvedValue(true),
  openURL: jest.fn().mockResolvedValue(true),
}));

jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const KeyboardAwareScrollView = require('react-native').ScrollView;
  return { KeyboardAwareScrollView };
});

jest.mock('react-native-mmkv', () => ({
  __esModule: true,
  useMMKVString: jest
    .fn()
    .mockReturnValue([{ setAvailableBio: () => {}, availableBio: jest.fn() }]),

  useMMKVNumber: jest.fn().mockReturnValue([
    {
      failedAttempts: jest.fn(),
      setFailedAttempts: jest.fn(),
      setLastSignedIn: jest.fn(),
    },
  ]),
  useMMKVBoolean: jest.fn().mockReturnValue([
    {
      setAuthed: jest.fn(),
    },
  ]),
  MMKV: jest.fn().mockReturnValue({
    getNumber: jest.fn(),
  }),
}));

jest.mock('react-native-permissions', () => require('react-native-permissions/mock'));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return {
    ...Reanimated,
    // mock Fade transitions (not included in mock lib for some reason?)
    FadeIn: {
      duration: jest.fn(),
    },
    FadeOut: {
      duration: jest.fn(),
    },
  };
});

jest.mock('react-native-sensitive-info', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
