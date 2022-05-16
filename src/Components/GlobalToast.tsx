import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import tw from '@/Styles/tailwind';
import { CSText } from '@/Components/Text';
import { CheckCircleIconFilled, ExclamationIcon } from './Icons';

type ToastProps = {
  text1?: string;
  props: { dark: boolean; onPress?: () => void };
};

const toastConfig: ToastConfig = {
  success: ({ text1, props: { dark, onPress } }: ToastProps) => (
    <TouchableOpacity
      style={tw`flex rounded-1 w-full justify-center mt-2 border-black w-90 shadow-lg bg-${
        dark ? 'secondary' : 'white'
      }`}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={tw`flex-row items-center p-3.5`}>
        <View style={[tw`mr-2`]}>
          <CheckCircleIconFilled
            color={dark ? tw.color('secondary') : tw.color('primary')}
            bgColor={dark ? tw.color('primary') : tw.color('black')}
          />
        </View>
        <CSText style={tw`flex-1 text-xs text-${dark ? 'white' : 'secondary'}`}>{text1}</CSText>
      </View>
    </TouchableOpacity>
  ),
  error: ({ text1, props: { dark, onPress } }: ToastProps) => (
    <TouchableOpacity
      style={tw`flex rounded-1 w-full justify-center mt-2 border-black w-90 shadow-lg bg-${
        dark ? 'secondary' : 'white'
      }`}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={tw`flex-row items-center p-3.5`}>
        <View style={tw`mr-2`}>
          <ExclamationIcon
            size={24}
            color="white"
            bgColor={dark ? tw.color('darkError') : tw.color('error')}
          />
        </View>
        <CSText style={tw`flex-1 text-xs text-${dark ? 'white' : 'secondary'}`}>{text1}</CSText>
      </View>
    </TouchableOpacity>
  ),
  info: ({ text1, props: { dark, onPress } }: ToastProps) => (
    <TouchableOpacity
      style={tw`flex rounded-1 w-full justify-center mt-2 border-black w-90 shadow-lg bg-${
        dark ? 'secondary' : 'white'
      }`}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={tw`flex-row items-center p-3.5`}>
        <View style={tw`mr-2`}>
          <ExclamationIcon
            size={24}
            color={dark ? tw.color('secondary') : 'white'}
            bgColor={dark ? 'white' : tw.color('secondary')}
          />
        </View>
        <CSText style={tw`flex-1 text-xs text-${dark ? 'white' : 'secondary'}`}>{text1}</CSText>
      </View>
    </TouchableOpacity>
  ),
};

export const GlobalToast = () => {
  const insets = useSafeAreaInsets();

  return <Toast config={toastConfig} topOffset={insets.top} bottomOffset={insets.bottom} />;
};
