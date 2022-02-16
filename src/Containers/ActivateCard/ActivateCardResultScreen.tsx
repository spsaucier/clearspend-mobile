import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import tw from '@/Styles/tailwind';
import { MainScreens, MainStackParamTypes } from '@/Navigators/NavigatorTypes';
import { ActivityIndicator, Button, CSText, FocusAwareStatusBar } from '@/Components';
import { useActivateCard } from '@/Queries/card';

const physicalChipCardImage = require('@/Assets/Images/blank-physical-chip-card.png');

type Props = NativeStackScreenProps<MainStackParamTypes, MainScreens.ActivateCardResult>;

export const ActivateCardResultScreen = ({ route }: Props) => {
  const { lastFour } = route.params;

  const { t } = useTranslation();
  const { navigate, goBack } = useNavigation();
  const { mutate: activateCard, isLoading, isSuccess } = useActivateCard();

  useEffect(() => {
    activateCard(
      { lastFour },
      {
        onError: () => {
          goBack();
        },
      },
    );
    // run once on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView edges={['bottom', 'right', 'left']} style={tw`flex-1 bg-white pt-6`}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" translucent />
      <View style={tw`px-4`}>
        <Image
          style={tw`w-full`}
          source={physicalChipCardImage}
          resizeMethod="scale"
          resizeMode="cover"
        />
      </View>
      <View style={tw`flex-1 px-4 pt-10`}>
        {isLoading || !isSuccess ? (
          <View style={tw`flex-1 items-center pt-8`}>
            <ActivityIndicator />
            <CSText style={tw`font-telegraf text-2xl leading-relaxed pt-5`}>
              {t('activateCard.loadingTitle')}
            </CSText>
            <CSText style={tw`text-base leading-relaxed opacity-75 pt-1`}>
              {t('activateCard.loadingSubTitle')}
            </CSText>
          </View>
        ) : (
          <View style={tw`flex-1 items-center justify-between`}>
            <View>
              <CSText style={tw`text-2xl leading-relaxed font-telegraf`}>
                {t('activateCard.successTitle')}
              </CSText>
              <CSText style={tw`text-base leading-relaxed pt-5 opacity-75`}>
                {t('activateCard.successSubTitle')}
              </CSText>
            </View>
            <View style={tw`items-center w-full pb-4`}>
              <Button
                label={t('activateCard.viewCardsButtonCta')}
                onPress={() => navigate(MainScreens.Wallet)}
              />
              <Button
                containerStyle={tw`mt-4 bg-white`}
                label={t('activateCard.activateAnotherCardButtonCta')}
                onPress={() => goBack()}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
