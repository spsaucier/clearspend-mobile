import React from 'react';
import { Platform, StyleProp, ViewStyle } from 'react-native';
import AddToAppleWalletButton from '@/NativeModules/AppleWallet/AddToAppleWalletButton';

type Props = {
  isVisible: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export const AddToWalletButton = ({ isVisible = true, onPress, style }: Props) => {
  const displayAppleWalletBtn = Platform.OS === 'ios';

  if (!isVisible) {
    return null;
  }

  if (displayAppleWalletBtn) {
    return <AddToAppleWalletButton onPress={onPress} style={style} />;
  }

  // TODO: google pay native button
  return null;
};
