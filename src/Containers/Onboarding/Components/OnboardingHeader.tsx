import React from 'react';
import { View } from 'react-native';
import tw from '@/Styles/tailwind';
import { BackArrowButton } from '@/Components/BackArrowButton';
import { EyeIcon } from '@/Components/Icons/eyeIcon';
import { CSText, FocusAwareStatusBar } from '@/Components';

interface Props {
  title: string;
  subTitle?: string;
  icon?: any;
}

export const OnboardingHeader = ({ title, subTitle, icon }: Props) => (
  <View style={tw`mb-5`}>
    <FocusAwareStatusBar backgroundColor={tw.color('forest-green')} barStyle="light-content" />
    <BackArrowButton color={tw.color('white')} style={tw`mb-6`} />
    <View style={tw`p-1 rounded-lg h-10 w-10 items-center justify-center border border-white`}>
      {icon || <EyeIcon color={tw.color('white')} />}
    </View>
    <CSText style={tw`text-3xl text-white font-semibold mb-3 mt-6`}>{title}</CSText>
    <CSText style={tw`text-sm text-white mb-6`}>{subTitle}</CSText>
  </View>
);
