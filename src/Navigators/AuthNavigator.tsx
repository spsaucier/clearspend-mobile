import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/Containers/Onboarding/LoginScreen';
import SetPasswordScreen from '@/Containers/Onboarding/SetPasswordScreen';
import ForgotPasswordScreen from '@/Containers/Onboarding/ForgotPasswordScreen';
import { AuthScreens, AuthStackParamTypes } from './NavigatorTypes';

const Stack = createNativeStackNavigator<AuthStackParamTypes>();

const LoginStack = () => (
  <Stack.Navigator initialRouteName={AuthScreens.Login} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={AuthScreens.Login} component={LoginScreen} />
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
