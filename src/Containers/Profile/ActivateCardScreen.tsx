import React, { useCallback, useState } from 'react';
import { ActivityIndicator, CSText } from '@/Components';
import { SafeAreaView, View } from 'react-native';
import tw from '@/Styles/tailwind';

import useNoBackPress from '@/Hooks/useNoBackPress';
import { useNavigation } from '@react-navigation/core';
import { PasscodeView } from '@/Containers/Onboarding/Components/Passcode/PasscodeView';
import { useTranslation } from 'react-i18next';
import { useActivateCard } from '@/Queries/card';

export const ActivateCardScreen = () => {
  useNoBackPress();
  const { mutate: activateCard, isLoading, isSuccess, error } = useActivateCard();

  const onComplete = (lastFour: string) => {
    activateCard({ lastFour });
  };

  return (
    <SafeAreaView>
      <CSText style={tw`text-2xl pl-4`}>**Placeholder** Activate Card</CSText>

      {/*TODO: TEMP reuse of this component, build a dedicated one or factor the common functionality*/}
      <PasscodeView
        title={
          <CSText style={tw`font-telegraf text-2xl mb-3 ml-4 mt-6`}>
            {'Enter the last 4 digits\n'}
            {'Temp for testing. \nSwipe back and return to retry'}
          </CSText>
        }
        onSuccessFinished={onComplete}
      />
      <View style={tw`ml-4`}>
        {isLoading ? <ActivityIndicator /> : null}
        {error ? (
          <CSText style={tw`text-error`}>{`Error! ${error.message} \n ${
            error?.response?.data ? JSON.stringify(error.response.data, null, 2) : ''
          }`}</CSText>
        ) : null}
        {isSuccess ? <CSText>Success!</CSText> : null}
      </View>
    </SafeAreaView>
  );
};
