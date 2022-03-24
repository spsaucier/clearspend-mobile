import { NativeModules, NativeEventEmitter } from 'react-native';
import { CardDetailsResponse } from '@/generated/capital';

const { AppleWalletModule } = NativeModules;

type PushProvisioningOptions = {
  withName: string;
  description: string;
  last4: string;
};

export type CardDigitalWalletStates = {
  lastFour: string;
  canAddPass: boolean;
}[];

export const WalletEventEmitter = new NativeEventEmitter(AppleWalletModule);

export const AppleWallet = {
  beginPushProvisioning: (
    options: PushProvisioningOptions,
    // TODO: do we need to handle the access token expiring or will it be used immediately?
    accessToken: string,
    cardId: string,
  ) => {
    AppleWalletModule.beginPushProvisioning(options, accessToken, cardId);
  },

  canAddPaymentPass: async (lastFour: string): Promise<boolean> =>
    AppleWalletModule.canAddPaymentPass(lastFour),
};

export const checkCardDigitalWalletStates = async (
  activeCards: CardDetailsResponse[],
): Promise<CardDigitalWalletStates> => {
  const cardLastFours = activeCards.map((card) => card?.card?.lastFour ?? 'empty');

  const cardStates = await Promise.all(
    cardLastFours.map(async (lastFour) => {
      const canAddPass = await AppleWallet.canAddPaymentPass(lastFour);

      return { lastFour, canAddPass };
    }),
  );

  return cardStates;
};
