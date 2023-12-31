import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PasscodeSet } from '../Components/Passcode/PasscodeSet';
import { PasscodeConfirm } from '../Components/Passcode/PasscodeConfirm';
import { BioPasscodeParams, BioPasscodeScreens } from './BioPasscodeTypes';
import tw from '@/Styles/tailwind';
import SetBiometricsOrPasscodeScreen from './SetBiometricsOrPasscodeScreen';

const BioPasscodeStack = createNativeStackNavigator<BioPasscodeParams>();

export const SetBioPasscodeNavigator = () => (
  <BioPasscodeStack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: tw.color('secondary'), paddingHorizontal: 24 },
    }}
  >
    <BioPasscodeStack.Screen
      name={BioPasscodeScreens.SetBioOrPasscode}
      component={SetBiometricsOrPasscodeScreen}
      options={{ gestureEnabled: false }}
    />
    <BioPasscodeStack.Screen name={BioPasscodeScreens.Set} component={PasscodeSet} />
    <BioPasscodeStack.Screen name={BioPasscodeScreens.Confirm} component={PasscodeConfirm} />
  </BioPasscodeStack.Navigator>
);

export default SetBioPasscodeNavigator;
