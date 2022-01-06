import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card } from './Card';
import tw from '@/Styles/tailwind';
import { CardDetailsResponse } from '@/generated/capital';
import { CSText } from '@/Components';
import { revealCardKey } from '@/Queries/card';

export const CardInfoContent = ({ cardData }: { cardData: CardDetailsResponse }) => {
  const { card, availableBalance } = cardData;
  const { t } = useTranslation();

  const { cardId, lastFour, type, status, address, externalRef } = card;
  const { amount: balanceAmount } = availableBalance;

  const isFrozen = status === 'INACTIVE';
  const isVirtual = type === 'VIRTUAL';

  const webviewRef = useRef<WebView>(null);

  const sendDataToWebView = (data: string) => {
    webviewRef.current?.postMessage(data);
  };

  const textColor = isFrozen ? 'white' : 'black';

  return (
    <View style={tw`flex-1 px-4 pt-15`}>
      <View style={tw`justify-center relative`}>
        <Card
          cardId={cardId!}
          balance={balanceAmount}
          lastDigits={lastFour!}
          isVirtual={isVirtual}
          isFrozen={isFrozen}
          showSensitiveInformation
        />

        <View style={{ height: Dimensions.get('window').width * 0.63, position: 'absolute', width: '100%', left: 15 }}>
          <WebView
            ref={webviewRef}
            originWhitelist={['*']}
            bounces={false}
            style={{ backgroundColor: 'transparent' }}
            showsHorizontalScrollIndicator={false}
            onMessage={async (event: any) => {
              const { data } = event.nativeEvent;
              const result = await revealCardKey({ nonce: data, cardId });
              sendDataToWebView(result?.ephemeralKey!);
            }}
            source={{
              // eslint-disable-next-line global-require
              html: /* html */`
<html>
  <head>
    <title>ClearSpend Card</title>
    <link href="src/index.css" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <script src="https://js.stripe.com/v3"></script>
    <style>
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      }

      #card-back {
        position: relative;
        width: 100vw;
        height: 63.54vw;
      }
      
      #card-details {
        position: absolute;
        left: 3vw;
        bottom: 3vw;
      
        color: ${textColor};
        font-size: 5vw;
        line-height: 1.2;
        font-variant: tabular-nums;
      }

      #cvv-text,
      #exp-text {
        font-size: 3vw;
      }
      
      #card-expiry,
      #card-cvc {
        min-width: 15vw;
      }
      #card-number {
        min-width: 80vw;
      }
      
      #expiry-cvc-wrapper {
        display: flex;
      }
      
      #expiry-wrapper,
      #cvc-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      
      #expiry-wrapper {
        width: 30vw;
      }
    
    </style>
  </head>

  <body>
    <div id="card-back">
      <div id="card-details">
        <div id="cardholder-name"></div>
        <div id="card-number"></div>
        <div id="expiry-cvc-wrapper">
          <div id="expiry-wrapper">
            <div id="exp-text">VALID UNTIL</div>
            <div id="card-expiry"></div>
          </div>
          <div id="cvc-wrapper">
            <div id="cvv-text">CVV</div>
            <div id="card-cvc"></div>
          </div>
        </div>
      </div>
    </div>
    <script>
      const STRIPE_PUBLISHABLE_KEY =
        "pk_test_51K4bTGGAnZyEKADzAHWpsUzRhpZKBUdFOWgBfdfSw302hniCVohvChc3THqrUdVN7tHxqpu8JNz3ABuN35OBuYtu00m8x9cVd3";
      const STRIPE_SECRET_KEY =
        "sk_test_51K4bTGGAnZyEKADzo2QvLZEYpQ4F7SUuK9041f6O7nIweNnEge9zr1yjiULB2ZvolgJPsfYrU64ClSzLTRqiMkMm00mR7wTpjw";
      const CARD_ID = "${externalRef}";

      const renderCard = async () => {
        const stripe = Stripe(STRIPE_PUBLISHABLE_KEY, {
          betas: ["issuing_elements_2"]
        });
        const elements = stripe.elements({
          fonts: [{
            cssSrc: "src/fonts.css"
          }]
        });

        const nonceResult = await stripe.createEphemeralKeyNonce({
          issuingCard: CARD_ID
        });

        const getEphemeralKey = () => new Promise((resolve, reject) => {
          window.addEventListener("message", message => {
            return resolve(message.data);
          });
          window.ReactNativeWebView.postMessage(nonceResult.nonce);
        });

        const ephemeralKey = await getEphemeralKey();

        const cardResult = await stripe.retrieveIssuingCard(CARD_ID, {
          ephemeralKeySecret: ephemeralKey,
          nonce: nonceResult.nonce
        });

        const NUMBER_STYLE = {
          base: {
            color: "${textColor}",
            fontSize: "20px",
            lineHeight: 2,
            'fontVariant': 'tabular-nums',
          }
        };
        const STYLE = {
          base: {
            color: "${textColor}",
            fontSize: "18px",
            textAlign: 'left',
            'fontVariant': 'tabular-nums',
          }
        };

        const name = document.getElementById("cardholder-name");
        const number = elements.create("issuingCardNumberDisplay", {
          issuingCard: CARD_ID,
          style: NUMBER_STYLE
        });
        const expiry = elements.create("issuingCardExpiryDisplay", {
          issuingCard: CARD_ID,
          style: STYLE
        });
        const cvc = elements.create("issuingCardCvcDisplay", {
          issuingCard: CARD_ID,
          style: STYLE
        });

        name.textContent = cardResult.issuingCard.cardholder.name;
        number.mount("#card-number");
        expiry.mount("#card-expiry");
        cvc.mount("#card-cvc");
      };

      renderCard();
    </script>
  </body>
</html>
            `,
          }}
          />
        </View>
      </View>

      {!!address?.streetLine1 && (
        <>
          {/* Address Section */}
          <View style={tw`mt-6`}>
            <CSText style={tw`text-white text-xs`}>{t('cardInfo.billingAddress')}</CSText>
            <TouchableOpacity
              style={tw`mt-2 p-4 bg-white rounded-md flex flex-row justify-between items-center`}
            >
              <View style={tw`flex`}>
                <CSText style={tw`font-montreal`}>
                  {`${address.streetLine1} ${address.streetLine2}`}
                </CSText>
                <CSText style={tw`mt-1 font-montreal`}>
                  {`${address.locality}, ${address.region} ${address.postalCode}, ${address.country}`}
                </CSText>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};
