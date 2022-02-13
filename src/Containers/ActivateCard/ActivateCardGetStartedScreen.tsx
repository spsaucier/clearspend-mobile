import React from 'react';
import { Image, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useNavigation } from '@react-navigation/core';
import { Button, CSText, FocusAwareStatusBar } from '@/Components';
import tw from '@/Styles/tailwind';
import { MainScreens } from '@/Navigators/NavigatorTypes';

const physicalChipCardImage = require('@/Assets/Images/blank-physical-chip-card.png');

export const ActivateCardGetStartedScreen = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();

  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" translucent />
      <View style={tw`flex-1 bg-white pt-10`}>
        <View style={tw`px-4`}>
          <Image
            style={tw`w-full`}
            source={physicalChipCardImage}
            resizeMethod="scale"
            resizeMode="cover"
          />
        </View>
        <View style={tw`flex-1 items-center justify-between pl-4 pr-4 pt-6`}>
          <View>
            <CSText style={tw`font-telegraf font-light text-2xl leading-loose`}>
              {t('activateCard.activateCSCard')}
            </CSText>
            <CSText style={tw`text-sm leading-loose pt-4`}>
              {t('activateCard.getStartedInstructions')}
            </CSText>
          </View>
          <Button
            containerStyle={tw`mb-8`}
            label={t('activateCard.getStartedButtonCta')}
            onPress={() => navigate(MainScreens.ActivateCardDigitEntry)}
          />
        </View>
      </View>
    </>
  );
};
