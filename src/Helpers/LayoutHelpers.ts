import { Dimensions, NativeModules } from 'react-native';

const { height: screenHeight } = Dimensions.get('screen');
const { height: windowHeight } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;

export const getNormalizedSnapPoint = () => {
  /*
    On older Android devices `windowHeight` includes the status bar height

    screenHeight - windowHeight = 0 (iOS)
    screenHeight - windowHeight = bottom nav height (Android new)
    screenHeight - windowHeight - statusBarHeight = bottom nav height (Android old)
  */
  let bottomNav = screenHeight - windowHeight;
  const statusBarHeight = StatusBarManager.HEIGHT || 0;

  /*
    assume that if the value returned for bottom nav
    is larger than twice the status bar height then
    it's probably not including the status bar e.g. it's old
  */
  if (bottomNav > 2 * statusBarHeight) {
    bottomNav -= statusBarHeight;
  }

  return screenHeight - bottomNav - statusBarHeight;
};
