import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Vibration } from 'react-native';

export const longFeedback = () => {
  Vibration.vibrate(500);
};

export const lightFeedback = () => {
  ReactNativeHapticFeedback.trigger('impactLight');
};
