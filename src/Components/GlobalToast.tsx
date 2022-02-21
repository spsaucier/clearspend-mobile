import React from 'react';
import { View } from 'react-native';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import tw from '@/Styles/tailwind';
import { CSText } from '@/Components/Text';
import { CheckCircleIconFilled, ExclamationIcon } from './Icons';

const toastConfig: ToastConfig = {
  success: ({ text1, props: { dark } }: { text1?: string; props: { dark: boolean } }) => (
    <View
      style={tw`flex rounded-1 w-full justify-center mt-2 border-black w-90 shadow-lg bg-${
        dark ? 'forest' : 'white'
      }`}
    >
      <View style={tw`flex-row items-center p-3.5`}>
        <View style={[tw`mr-2`]}>
          <CheckCircleIconFilled
            color={dark ? tw.color('forest') : tw.color('primary')}
            bgColor={dark ? tw.color('primary') : tw.color('black')}
          />
        </View>
        <CSText style={tw`flex-1 text-xs text-${dark ? 'white' : 'forest'}`}>{text1}</CSText>
      </View>
    </View>
  ),
  error: ({ text1, props: { dark } }: { text1?: string; props: { dark: boolean } }) => (
    <View
      style={tw`flex rounded-1 w-full justify-center mt-2 border-black w-90 shadow-lg bg-${
        dark ? 'forest' : 'white'
      }`}
    >
      <View style={tw`flex-row items-center p-3.5`}>
        <View style={tw`mr-2`}>
          <ExclamationIcon
            size={24}
            color="white"
            bgColor={dark ? tw.color('darkError') : tw.color('error')}
          />
        </View>
        <CSText style={tw`flex-1 text-xs text-${dark ? 'white' : 'forest'}`}>{text1}</CSText>
      </View>
    </View>
  ),
  info: ({ text1, props: { dark } }: { text1?: string; props: { dark: boolean } }) => (
    <View
      style={tw`flex rounded-1 w-full justify-center mt-2 border-black w-90 shadow-lg bg-${
        dark ? 'forest' : 'white'
      }`}
    >
      <View style={tw`flex-row items-center p-3.5`}>
        <View style={tw`mr-2`}>
          <ExclamationIcon
            size={24}
            color={dark ? tw.color('forest') : 'white'}
            bgColor={dark ? 'white' : tw.color('forest')}
          />
        </View>
        <CSText style={tw`flex-1 text-xs text-${dark ? 'white' : 'forest'}`}>{text1}</CSText>
      </View>
    </View>
  ),
};

export const GlobalToast = () => {
  const insets = useSafeAreaInsets();

  return <Toast config={toastConfig} topOffset={insets.top} bottomOffset={insets.bottom} />;
};
