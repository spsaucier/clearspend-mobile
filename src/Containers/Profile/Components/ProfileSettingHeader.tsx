import React, { ReactElement } from 'react';
import { View } from 'react-native';
import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';

type Props = {
  title: string;
  icon?: ReactElement;
  noBackButton?: boolean;
};

export const ProfileSettingsHeader = ({ title, icon, noBackButton }: Props) => (
  <>
    {!noBackButton ? (
      <View style={tw`mb-5`}>
        <BackButtonNavigator />
      </View>
    ) : null}
    <View style={tw`flex flex-row`}>
      {icon || null}
      <CSText
        style={tw`font-telegraf text-base text-2xl font-light text-black pt-1 ml-3 leading-6`}
      >
        {title}
      </CSText>
    </View>
  </>
);
