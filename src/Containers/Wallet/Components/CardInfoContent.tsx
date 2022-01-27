import React, { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card } from './Card';
import tw from '@/Styles/tailwind';
import { CardDetailsResponse } from '@/generated/capital';
import { CSText } from '@/Components';
import { revealCardKey } from '@/Queries/card';
import { ActivityIndicator } from '../../../Components/ActivityIndicator';

export const CardInfoContent = ({ cardData }: { cardData: CardDetailsResponse }) => {
  const { card, availableBalance } = cardData;
  const [loading, setLoading] = useState(true);
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

        <View
          style={{
            height: Dimensions.get('window').width * 0.63,
            position: 'absolute',
            width: '100%',
            left: 15,
          }}
        >
          <WebView
            ref={webviewRef}
            originWhitelist={['*']}
            bounces={false}
            style={{ backgroundColor: 'transparent' }}
            showsHorizontalScrollIndicator={false}
            onMessage={async (event: any) => {
              const { data } = event.nativeEvent;
              const result = await revealCardKey({ nonce: data, cardId });
              setLoading(false);
              sendDataToWebView(result?.ephemeralKey!);
            }}
            source={{
              // eslint-disable-next-line global-require
              html: /* html */ `
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

      .row {
        display: flex;
        align-items: center;
      }

      #cvv-text,
      #exp-text {
        font-size: 3vw;
      }
      
      #card-expiry {
        min-width: 50px;
      }
      #card-cvc {
        min-width: 34px;
      }
      #card-number {
        min-width: 200px;
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

      .copy-icon,
      .copy-icon-success {
        width: 14px;
        height: 14px;
        background-repeat: no-repeat;
        background-size: 100%;
        background-size: contain;
      }

      .copy-icon {
        background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 115.77 122.88' style='enable-background:new 0 0 115.77 122.88' xml:space='preserve'%3E%3Cstyle type='text/css'%3E.st0%7Bfill-rule:evenodd;clip-rule:evenodd;fill: %23357457%7D%3C/style%3E%3Cg%3E%3Cpath class='st0' d='M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z'/%3E%3C/g%3E%3C/svg%3E");
      }

      .copy-icon-success {
        display: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' enable-background='new 0 0 64 64'%3E%3Cpath d='M32,2C15.431,2,2,15.432,2,32c0,16.568,13.432,30,30,30c16.568,0,30-13.432,30-30C62,15.432,48.568,2,32,2z M25.025,50 l-0.02-0.02L24.988,50L11,35.6l7.029-7.164l6.977,7.184l21-21.619L53,21.199L25.025,50z' fill='%2343a047'/%3E%3C/svg%3E%0A");
      }
    
    </style>
  </head>

  <body>
    <div id="card-back">
      <div id="card-details">
        <div id="cardholder-name"></div>
        <div class="row">
          <div id="card-number"></div>
          <div class="copy-icon" id="card-number-copy"></div>
          <div class="copy-icon-success" id="card-number-copy-success"></div>
        </div>
        <div id="expiry-cvc-wrapper">
          <div id="expiry-wrapper">
            <div id="exp-text">VALID UNTIL</div>
            <div class="row">
              <div id="card-expiry"></div>
              <div class="copy-icon" id="card-expiry-copy"></div>
              <div class="copy-icon-success" id="card-expiry-copy-success"></div>
            </div>
          </div>
          <div id="cvc-wrapper">
            <div id="cvv-text">CVV</div>
            <div class="row">
              <div id="card-cvc"></div>
              <div class="copy-icon" id="card-cvc-copy"></div>
              <div class="copy-icon-success" id="card-cvc-copy-success"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script>
      // TODO: Set this to be from env variable
      const STRIPE_PUBLISHABLE_KEY =
        "pk_test_51K4bTGGAnZyEKADzAHWpsUzRhpZKBUdFOWgBfdfSw302hniCVohvChc3THqrUdVN7tHxqpu8JNz3ABuN35OBuYtu00m8x9cVd3";
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

        let hasReceivedData = false;

        const getEphemeralKey = () => new Promise((resolve, reject) => {
          window.addEventListener("message", message => {
            if (!hasReceivedData) {
              hasReceivedData = true;
              return resolve(message.data);
            }
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
        const COPY_STYLE = {
          base: {
            fontSize: '12px',
            lineHeight: '24px',
          },
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

        const numberCopy = elements.create('issuingCardCopyButton', {
          style: COPY_STYLE,
          toCopy: 'number',
        });

        const cvcCopy = elements.create('issuingCardCopyButton', {
          style: COPY_STYLE,
          toCopy: 'cvc',
        });

        const expiryCopy = elements.create('issuingCardCopyButton', {
          style: COPY_STYLE,
          toCopy: 'expiry',
        });

        name.textContent = cardResult.issuingCard.cardholder.name;
        number.mount("#card-number");
        expiry.mount("#card-expiry");
        cvc.mount("#card-cvc");

        numberCopy.mount('#card-number-copy');
        cvcCopy.mount('#card-cvc-copy');
        expiryCopy.mount('#card-expiry-copy');
      };

      renderCard();
    </script>
  </body>
</html>
            `,
            }}
          />
          {loading && (
            <View
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                marginLeft: -35,
                marginTop: -30,
              }}
            >
              <ActivityIndicator />
            </View>
          )}
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
