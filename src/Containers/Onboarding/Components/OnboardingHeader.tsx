import React from 'react';
import { View, Text } from 'react-native';
import tw from '@/Styles/tailwind';
import { BackArrowButton } from '@/Components/BackArrowButton';
import { EyeIcon } from '@/Components/Icons/eyeIcon';

interface Props {
  title: string;
  subTitle?: string;
  icon?: any;
}

export const OnboardingHeader = ({ title, subTitle, icon }: Props) => (
  <View style={tw`mb-5`}>
    <BackArrowButton color={tw.color('white')} style={tw`mb-6`} />
    <View
      style={tw`p-1 bg-primaryLight rounded-lg h-10 w-10 items-center justify-center border border-primaryLightLight`}
    >
      {icon || <EyeIcon color={tw.color('white')} />}
    </View>
    <Text style={tw`text-3xl text-white font-semibold mb-3 mt-6`}>{title}</Text>
    <Text style={tw`text-sm text-copyLight mb-6`}>{subTitle}</Text>
  </View>
);
