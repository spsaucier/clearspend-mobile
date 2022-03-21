import { Alert, NativeModules } from 'react-native';

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

  canAddPaymentPass: async () => {
    const passes = await AppleWalletModule.getPaymentPasses();
    // eslint-disable-next-line no-console
    console.warn('existing passes', passes);
    Alert.alert('Existing passes', JSON.stringify(passes));

    const canAdd = await AppleWalletModule.canAddPaymentPass();
    // eslint-disable-next-line no-console
    console.warn(`can add payment pass: ${canAdd}`);
    Alert.alert('Can add pass', canAdd);
  },
};
