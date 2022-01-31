import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import { CSText, FocusAwareStatusBar } from '@/Components';
import { OnboardingBackBtnNav } from '@/Components/OnboardingBackBtnNav';

interface Props {
  titlePart1: string;
  titlePart2: string;
  titlePart3: string;
  subTitle?: string;
}

export const OnboardingScreenTitle = ({ titlePart1, titlePart2, titlePart3, subTitle }: Props) => {
  const { t } = useTranslation();
  return (
    <View style={tw`mb-5`}>
      <FocusAwareStatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" />
      <OnboardingBackBtnNav backNav={t('general.back')} />
      <CSText style={tw`font-telegraf text-2xl text-white mb-3 mt-6`}>
        {titlePart1}
        <CSText style={tw`font-telegraf text-2xl text-primary`}> {titlePart2}</CSText>
        <CSText style={tw`font-telegraf text-2xl text-white mb-3 mt-6`}> {titlePart3}</CSText>
      </CSText>
      <CSText style={tw`text-sm text-white leading-5`}>{subTitle}</CSText>
    </View>
  );
};
