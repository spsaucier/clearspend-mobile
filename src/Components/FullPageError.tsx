import React from 'react';
import { View } from 'react-native';
import { CSText } from '@/Components/Text';
import tw from '@/Styles/tailwind';
import { ErrorIcon } from '@/Components/Icons/errorIcon';

type Props = {
  title: string;
  subTitle?: string;
};

export const FullPageError = ({ title, subTitle }: Props) => (
  <View style={tw`flex-1 items-center justify-center px-11`}>
    <ErrorIcon style={tw`mb-8`} />
    <CSText style={tw`text-2xl text-center leading-relaxed font-telegraf mb-8`}>{title}</CSText>
    {subTitle ? (
      <CSText style={tw`text-base text-center leading-relaxed font-telegraf mb-8`}>
        {subTitle}
      </CSText>
      ) : null}
  </View>
  );
