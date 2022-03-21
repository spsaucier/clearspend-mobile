import { NativeModules } from 'react-native';

const { GooglePayModule } = NativeModules;

export const GooglePay = {
  test: (name: string, description: string) => {
    GooglePayModule.test(name, description);
  },
};
