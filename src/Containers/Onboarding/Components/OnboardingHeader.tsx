import React from 'react';
import { View } from 'react-native';
import tw from '@/Styles/tailwind';
import { BackArrowButton } from '@/Components/BackArrowButton';
import { CSText, FocusAwareStatusBar } from '@/Components';

interface Props {
  title: string;
  subTitle?: string;
  hideBackArrow?: boolean;
}

export const OnboardingHeader = ({ title, subTitle, hideBackArrow }: Props) => (
  <View style={tw`mb-5`}>
    <FocusAwareStatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" />
    {!hideBackArrow && <BackArrowButton color={tw.color('white')} style={tw`mb-6`} />}
    <CSText style={tw`font-telegraf text-3xl text-white mb-3 mt-6`} accessibilityLabel={title}>
      {title}
    </CSText>
    <CSText style={tw`text-sm text-white mb-6 leading-5`} accessibilityLabel={subTitle}>
      {subTitle}
    </CSText>
  </View>
);
