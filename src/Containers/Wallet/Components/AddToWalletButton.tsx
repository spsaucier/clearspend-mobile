import React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppleWalletIcon } from '@/Components/Icons';
import { CSText } from '@/Components';
import tw from '@/Styles/tailwind';

type Props = {
  show?: boolean;
};

export const AddToWalletButton = ({ show = true }: Props) => {
  const { t } = useTranslation();
  const displayAppleWalletBtn = Platform.OS === 'ios';
  if (show)
    if (displayAppleWalletBtn) {
      return (
        <View style={tw`px-4`}>
          {/* Apple Wallet Button */}
          {displayAppleWalletBtn && (
            <TouchableOpacity
              style={tw`flex-row bg-black rounded-lg p-1 w-full items-center justify-center border-black border-2 mt-5 mb-2`}
              onPress={() => {
                // eslint-disable-next-line no-console
                console.log('Add to Apple Wallet Pressed');
              }}
            >
              <AppleWalletIcon style={tw`mr-1`} />
              <CSText style={tw`text-white ml-1 text-base`}>
                {t('cardProfile.addToAppleWallet')}
              </CSText>
            </TouchableOpacity>
          )}
        </View>
      );
    } else return null;
  return null;
};
