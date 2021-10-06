import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@/Containers/Onboarding/LoginScreen';
import SelectOrganizationScreen from '@/Containers/Onboarding/SelectOrganizationScreen';
import EnterMobileScreen from '@/Containers/Onboarding/EnterMobileScreen';
import VerifyAccountScreen from '@/Containers/Onboarding/VerifyAccountScreen';
import SetPasswordScreen from '@/Containers/Onboarding/SetPasswordScreen';
import ForgotPasswordScreen from '@/Containers/Onboarding/ForgotPasswordScreen';

type AuthStackParamTypes = {
  LoginStack: undefined;
  Auth: undefined;
  Login: undefined;
  'Select Organization': undefined;
  'Enter Mobile': undefined;
  'Verify Account': undefined;
  'Set Password': undefined;
  'Forgot Password': undefined;
};

const Stack = createStackNavigator<AuthStackParamTypes>();

const LoginStack = () => (
  <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Select Organization" component={SelectOrganizationScreen} />
    <Stack.Screen name="Enter Mobile" component={EnterMobileScreen} />
    <Stack.Screen name="Verify Account" component={VerifyAccountScreen} />
    <Stack.Screen name="Set Password" component={SetPasswordScreen} />
    <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginStack" component={LoginStack} />
    {/* Add screens here that are outside the login/signin flow */}
  </Stack.Navigator>
);

export default AuthNavigator;
