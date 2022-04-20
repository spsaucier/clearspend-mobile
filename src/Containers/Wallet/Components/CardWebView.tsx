import React, { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, Dimensions, Platform } from 'react-native';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import { Card } from './Card';
import tw from '@/Styles/tailwind';
import { CardDetailsResponse } from '@/generated/capital';
import { revealCardKey } from '@/Queries/card';
import { ActivityIndicator } from '@/Components/ActivityIndicator';

type Props = {
  onCardOptionsPress: () => void;
  cardData: CardDetailsResponse;
};

export const CardWebView = ({ cardData, onCardOptionsPress }: Props) => {
  const { card, availableBalance, allocationName } = cardData;
  const [loading, setLoading] = useState(true);
  const [readyCount, setReadyCount] = useState(0);

  const { cardId, lastFour, type, status, externalRef, cardLine3 } = card;
  const { amount: balanceAmount } = availableBalance;

  const isFrozen = status === 'INACTIVE';
  const isVirtual = type === 'VIRTUAL';

  const webviewRef = useRef<WebView>(null);

  const sendDataToWebView = (data: string) => {
    webviewRef.current?.postMessage(data);
  };

  const textColor = isFrozen ? 'white' : 'black';

  const en = encodeURIComponent;
  const search = `?externalRef=${en(externalRef || '')}&STRIPE_PUBLISHABLE_KEY=${en(
    Config.STRIPE_PUBLISHABLE_KEY,
  )}&STRIPE_ACCOUNT=${en(Config.STRIPE_ACCOUNT)}&OS=${en(Platform.OS)}&textColor=${en(textColor)}`;
  const uri = `${Config.WEB_URL}/stripe-reveal.html${search}`;

  return (
    <View style={tw`flex-1 justify-center relative`}>
      <Card
        cardId={cardId!}
        balance={balanceAmount || 0}
        lastDigits={lastFour!}
        isVirtual={isVirtual}
        isFrozen={isFrozen}
        showSensitiveInformation
        onCardOptionsPress={onCardOptionsPress}
        allocation={allocationName}
        cardTitle={cardLine3}
      />
      <View
        style={[
          tw`absolute w-full bottom-0 ml-2`,
          {
            height: Dimensions.get('window').width * 0.3,
          },
        ]}
      >
        <WebView
          ref={webviewRef}
          originWhitelist={['*']}
          bounces={false}
          style={[tw`bg-transparent`, { opacity: loading ? 0 : 1 }]}
          showsHorizontalScrollIndicator={false}
          textZoom={100}
          onMessage={async (event: any) => {
            const { data } = event.nativeEvent;
            if (data.indexOf('ephkn_pub') === 0) {
              const result = await revealCardKey({ nonce: data, cardId });
              sendDataToWebView(result?.ephemeralKey!);
            } else if (loading) {
              try {
                const dataObj = JSON.parse(data);
                if (dataObj.message.payload.event === 'ready') {
                  // Stripe sends one ready event per field/copy icon
                  if (readyCount + 1 === 4) {
                    setLoading(false);
                  }
                  setReadyCount(readyCount + 1);
                }
              } catch {
                // ignore
              }
            } else {
              try {
                const dataObj = JSON.parse(data);
                if (dataObj?.message?.payload?.event === 'click') {
                  // We do not know which one was clicked
                  Toast.show({
                    type: 'success',
                    text1: 'This card number has been copied to the clipboard',
                  });
                }
              } catch {
                // Do nothing
              }
            }
          }}
          source={{ uri }}
        />
        {loading && (
          <View
            style={[
              tw`absolute w-full bottom-0 -ml-2 items-center justify-center`,
              { aspectRatio: 1.6 },
            ]}
          >
            <ActivityIndicator style={tw`w-8`} bgColor={isFrozen ? 'white' : 'black'} />
          </View>
        )}
      </View>
    </View>
  );
};
