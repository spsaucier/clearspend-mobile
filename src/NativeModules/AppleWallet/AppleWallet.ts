import { Alert, NativeModules } from 'react-native';
import Toast from 'react-native-toast-message';

const { AppleWalletModule } = NativeModules;

type PushProvisioningOptions = {
  withName: string;
  description: string;
  last4: string;
};

export const AppleWallet = {
  beginPushProvisioning: (
    options: PushProvisioningOptions,
    // TODO: do we need to handle the access token expiring or will it be used immediately?
    accessToken: string,
    cardId: string,
  ) => {
    AppleWalletModule.beginPushProvisioning(options, accessToken, cardId);
  },

  canAddPaymentPass: async () => AppleWalletModule.canAddPaymentPass(),

  getPaymentPasses: async () => AppleWalletModule.getPaymentPasses(),
};
