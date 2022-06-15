import React, { useEffect, useRef, useState } from 'react';
import {
  Constants,
  GooglePayCardToken,
  isCardInWallet,
  AddToWalletButton,
} from '@stripe/stripe-react-native';
import { Alert, AppState, Dimensions, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import tw from '@/Styles/tailwind';
import { Card } from '@/generated/capital';
import { useStripeEphemeralKey } from '@/Hooks/useStripeEphemeralKey';

const { width: screenWidth } = Dimensions.get('screen');

export const AddToDigitalWalletButton = ({
  card,
  cardHolderName,
  disabled,
}: {
  card: Card | undefined;
  cardHolderName: string;
  disabled: boolean;
}) => {
  const appState = useRef(AppState.currentState);
  const { t } = useTranslation();
  const { mutateAsync: fetchEphemeralKey, isLoading: isFetchingEphemeralKey } =
    useStripeEphemeralKey();

  const [key, setKey] = useState<object | null>(null);
  const [cardIsInWallet, setCardIsInWallet] = useState(false);
  const [androidCardToken, setAndroidCardToken] = useState<null | GooglePayCardToken>(null);

  const checkIfCardInWallet = async (l4: string): Promise<boolean> => {
    const { isInWallet, token, error } = await isCardInWallet({
      cardLastFour: l4,
    });

    if (error) {
      // TODO log in release?
      if (__DEV__) {
        Alert.alert(error.code, error.message);
      }
    } else {
      setCardIsInWallet(isInWallet ?? false);
      if (token && token.status === 'TOKEN_STATE_NEEDS_IDENTITY_VERIFICATION') {
        setAndroidCardToken(token);
      }
    }

    return isInWallet ?? false;
  };

  useEffect(() => {
    if (card && card?.lastFour && card?.cardId) {
      const checkCard = async (cId: string, cLast4: string) => {
        const isInWallet = await checkIfCardInWallet(cLast4);

        // Only request an ephemeral key if the card is not in the wallet
        if (!isInWallet) {
          const keyResponse = await fetchEphemeralKey({
            apiVersion: Constants.API_VERSIONS.ISSUING,
            cardId: cId,
          });
          setKey(keyResponse);
        }
      };

      checkCard(card.cardId, card.lastFour);
    }
  }, [card, fetchEphemeralKey]);

  useEffect(() => {
    // Recheck the digital wallet state of the card when the app is returning from the background
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        (async () => {
          if (card?.lastFour) {
            checkIfCardInWallet(card.lastFour);
          }
        })();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [card]);

  return (
    <View
      style={tw`items-center`}
      pointerEvents={disabled || !key || isFetchingEphemeralKey ? 'none' : 'auto'}
    >
      {!cardIsInWallet && card?.lastFour ? (
        <AddToWalletButton
          testID="add-to-digital-wallet-button"
          token={androidCardToken}
          androidAssetSource={{}}
          testEnv={__DEV__}
          style={tw.style('mb-5 h-12', {
            width: screenWidth * 0.88,
          })}
          iOSButtonStyle="onDarkBackground"
          cardHolderName={cardHolderName}
          cardDescription={t('addToDigitalWallet.digitalWalletDescription')}
          cardLastFour={card.lastFour}
          ephemeralKey={key ?? {}}
          onComplete={({ error }) => {
            if (error === null) {
              if (card?.lastFour) {
                checkIfCardInWallet(card.lastFour);
              }
              Toast.show({ type: 'success', text1: t('addToDigitalWallet.success') });
            } else if (
              error?.code === 'Canceled' ||
              // TODO: Fix in stripe library
              // @ts-expect-error android returns this code instead of the one specified in the type
              error?.code === 'USER_CANCELED'
            ) {
              Toast.show({ type: 'info', text1: t('addToDigitalWallet.cancelled') });
            } else if (error) {
              Toast.show({ type: 'error', text1: t('addToDigitalWallet.failure') });
            }
          }}
        />
      ) : null}
    </View>
  );
};
