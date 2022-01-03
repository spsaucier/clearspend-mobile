import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@/Containers/Onboarding/LoginScreen';
import SelectOrganizationScreen from '@/Containers/Onboarding/SelectOrganizationScreen';
import EnterMobileScreen from '@/Containers/Onboarding/EnterMobileScreen';
import VerifyAccountScreen from '@/Containers/Onboarding/VerifyAccountScreen';
import SetPasswordScreen from '@/Containers/Onboarding/SetPasswordScreen';
import ForgotPasswordScreen from '@/Containers/Onboarding/ForgotPasswordScreen';
import { AuthScreens, AuthStackParamTypes } from './NavigatorTypes';

const Stack = createStackNavigator<AuthStackParamTypes>();

const LoginStack = () => (
  <Stack.Navigator initialRouteName={AuthScreens.Login} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={AuthScreens.Login} component={LoginScreen} />
    <Stack.Screen name={AuthScreens.SelectOrganization} component={SelectOrganizationScreen} />
    <Stack.Screen name={AuthScreens.EnterMobile} component={EnterMobileScreen} />
    <Stack.Screen name={AuthScreens.VerifyAccount} component={VerifyAccountScreen} />
    <Stack.Screen name={AuthScreens.SetPassword} component={SetPasswordScreen} />
    <Stack.Screen name={AuthScreens.ForgotPassword} component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName={AuthScreens.Landing} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={AuthScreens.LoginStack} component={LoginStack} />
    {/* Add screens here that are outside the login/signin flow */}
  </Stack.Navigator>
);

export default AuthNavigator;
