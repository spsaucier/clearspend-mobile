import React from 'react';
import { StatusBar, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainScreens, MainStackParamTypes, TabScreens, TabStackParamTypes } from './NavigatorTypes';
import { ActivityIndicator } from '@/Components';
import tw from '@/Styles/tailwind';

// Tabs
import { WalletNavigator as WalletStack } from '@/Navigators/Wallet/WalletNavigator';
import { AdminNavigator as AdminStack } from '@/Navigators/Admin/AdminNavigator';
import { ProfileNavigator as ProfileStack } from '@/Navigators/Profile/ProfileNavigator';

// Screens
import ConfirmAuthScreen from '@/Containers/Onboarding/ConfirmAuthScreen';
import { SetBioPasscodeNavigator } from '@/Containers/Onboarding/BioPasscode/SetBioPasscodeNavigator';
import EnterMobileScreen from '@/Containers/Onboarding/EnterMobileScreen';
import EnterOTPScreen from '@/Containers/Onboarding/EnterOTPScreen';

import UpdatedTermsAndConditionsScreen from '@/Containers/Onboarding/UpdatedTermsAndConditionsScreen';

import { useAuthentication } from '@/Hooks/useAuthentication';
import useRequireBioOrPasscodeSetup from '@/Hooks/useRequireBioOrPasscodeSetup';
// import useRequire2FA from '@/Hooks/useRequire2FA';
import { useUser } from '@/Queries';
import OnboardingNotificationsScreen from '@/Containers/Onboarding/NotificationsScreen';
import useNotificationsSettings from '@/Hooks/useNotificationsSettings';

import { useAllPermissions } from '@/Queries/permissions';
import { showAdmin } from '@/Helpers/PermissionsHelpers';
import { useFeatureFlag } from '@/Hooks/useFeatureFlag';

import TabBar from './TabBar';

const Stack = createNativeStackNavigator<MainStackParamTypes>();

const Tab = createBottomTabNavigator<TabStackParamTypes>();

const LoadingScreen = () => (
  <View style={tw`flex-1 justify-center items-center bg-secondary`}>
    <StatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" />
    <ActivityIndicator />
  </View>
);

const MainTabs = () => {
  const { data: permissions, isLoading } = useAllPermissions();
  const { enabled: adminEnabled } = useFeatureFlag('view-admin');
  const hasAdminPermissions = showAdmin(permissions);

  const showAdminTab = hasAdminPermissions && adminEnabled;

  if (isLoading) return <LoadingScreen />;

  return (
    <Tab.Navigator
      initialRouteName={TabScreens.Wallet}
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name={TabScreens.Wallet} component={WalletStack} />
      {showAdminTab ? <Tab.Screen name={TabScreens.Admin} component={AdminStack} /> : null}
      <Tab.Screen name={TabScreens.Profile} component={ProfileStack} />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  const { loading, authed, passcodeEnabled, biometricsEnabled, isLoggingOut } = useAuthentication();
  const { onboardingNotificationsFirstCheck } = useNotificationsSettings();

  // TODO: Reenable 2FA setup prompt when backend is fixed
  // const { loading: loading2FA, shouldAct: needs2FA } = useRequire2FA();
  const loading2FA = false;
  const needs2FA = false;
  const { loading: loadingBioPasscode, shouldAct: needsBioPasscode } =
    useRequireBioOrPasscodeSetup();
  const { data: user } = useUser();

  if (loading || !user || loading2FA || loadingBioPasscode || isLoggingOut) {
    return <LoadingScreen />;
  }

  const requiresAuthConfirmation = (passcodeEnabled || biometricsEnabled) && !authed;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {requiresAuthConfirmation ? (
        <Stack.Screen name={MainScreens.ConfirmAuth} component={ConfirmAuthScreen} />
      ) : needs2FA ? (
        <Stack.Screen name={MainScreens.EnterMobile} component={EnterMobileScreen} />
      ) : needsBioPasscode ? (
        <Stack.Screen
          name={MainScreens.SetBiometricsOrPasscode}
          component={SetBioPasscodeNavigator}
          options={{ animationTypeForReplace: 'push' }}
        />
      ) : !onboardingNotificationsFirstCheck ? (
        <Stack.Screen
          name={MainScreens.OnboardingNotifications}
          component={OnboardingNotificationsScreen}
        />
      ) : (
        <Stack.Screen name={MainScreens.Tabs} component={MainTabs} />
      )}

      <Stack.Screen name={MainScreens.EnterOTP} component={EnterOTPScreen} />
      <Stack.Screen
        name={MainScreens.UpdatedTermsAndConditionsScreen}
        component={UpdatedTermsAndConditionsScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
