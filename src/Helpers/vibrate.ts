import { Platform, Vibration } from 'react-native';

export const vibrate = () => {
  Vibration.vibrate(
    Platform.select({
      android: [0, 80, 30, 150],
      ios: [0, 30],
    }),
  );
};
