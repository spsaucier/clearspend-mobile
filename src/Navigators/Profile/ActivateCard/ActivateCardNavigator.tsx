import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { sharedStackHeaderConfig } from '@/Helpers/NavigationHelpers';

import {
  ActivateCardScreens,
  ActivateCardStackParamTypes,
} from '@/Navigators/Profile/ActivateCard/ActivateCardNavigatorTypes';

import { ActivateCardDigitEntryScreen } from '@/Containers/ActivateCard/ActivateCardDigitEntryScreen';
import { ActivateCardResultScreen } from '@/Containers/ActivateCard/ActivateCardResultScreen';

const Stack = createNativeStackNavigator<ActivateCardStackParamTypes>();

export const ActivateCardNavigator = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName={ActivateCardScreens.DigitEntry}
      screenOptions={{
        ...sharedStackHeaderConfig('', t('general.back'), () => {
          navigation.goBack();
        }),
      }}
    >
      <Stack.Screen
        name={ActivateCardScreens.DigitEntry}
        component={ActivateCardDigitEntryScreen}
      />
      <Stack.Screen
        name={ActivateCardScreens.Result}
        component={ActivateCardResultScreen}
        options={{ headerShown: true, headerTitle: '', headerLeft: () => null }}
      />
    </Stack.Navigator>
  );
};
