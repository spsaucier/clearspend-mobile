import React from 'react';
import { Text, View } from 'react-native';
import tw from '@/Styles/tailwind';
import { CheckMarkIcon, ExclamationIcon } from './Icons';

export const toastConfig = {
  success: ({ text1, props: { dark } }: { text1?: string; props: { dark: boolean } }) => (
    <View
      style={tw`h-11 rounded-1 w-full justify-center mt-2 border-black w-90 shadow-lg bg-${
        dark ? 'forest' : 'white'
      }`}
    >
      <View style={tw`flex-row items-center px-3.5`}>
        <View style={[tw`rounded-full mr-2 p-1 bg-${dark ? 'primary' : 'forest'}`]}>
          <CheckMarkIcon size={13} color={dark ? tw.color('forest') : tw.color('primary')} />
        </View>
        <Text style={tw`text-xs text-${dark ? 'white' : 'forest'}`}>{text1}</Text>
      </View>
    </View>
  ),
  error: ({ text1, props: { dark } }: { text1?: string; props: { dark: boolean } }) => (
    <View
      style={tw`h-11 rounded-1 w-full justify-center mt-2 border-black w-90 shadow-lg bg-${
        dark ? 'forest' : 'white'
      }`}
    >
      <View style={tw`flex-row items-center px-3.5`}>
        <View style={[tw`mr-2`]}>
          <ExclamationIcon
            size={23}
            color="white"
            bgColor={dark ? tw.color('darkError') : tw.color('error')}
          />
        </View>
        <Text style={tw`text-xs text-${dark ? 'white' : 'forest'}`}>{text1}</Text>
      </View>
    </View>
  ),
  info: ({ text1, props: { dark } }: { text1?: string; props: { dark: boolean } }) => (
    <View
      style={tw`h-11 rounded-1 w-full justify-center mt-2 border-black w-90 shadow-lg bg-${
        dark ? 'forest' : 'white'
      }`}
    >
      <View style={tw`flex-row items-center px-3.5`}>
        <View style={[tw`mr-2`]}>
          <ExclamationIcon
            size={23}
            color={dark ? tw.color('forest') : 'white'}
            bgColor={dark ? 'white' : tw.color('forest')}
          />
        </View>
        <Text style={tw`text-xs text-${dark ? 'white' : 'forest'}`}>{text1}</Text>
      </View>
    </View>
  ),
};
