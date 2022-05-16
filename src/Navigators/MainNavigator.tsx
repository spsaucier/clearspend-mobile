import React from 'react';
import { StatusBar, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { MainScreens, MainStackParamTypes } from './NavigatorTypes';
import { ActivityIndicator } from '@/Components';
import tw from '@/Styles/tailwind';

// Screens
import WalletScreen from '@/Containers/Wallet/WalletScreen';
import ProfileScreen from '@/Containers/Profile/ProfileScreen';
import ChangePasswordScreen from '@/Containers/Profile/ChangePassword/CurrentPasswordScreen';
import NotificationSettingScreen from '@/Containers/Profile/NotificationSettingsScreen';
import LoginOptionsScreen from '@/Containers/Profile/LoginOptions';
import LegalDocumentsScreen from '@/Containers/Profile/LegalDocuments';
import NotificationScreen from '@/Containers/Notifications/NotificationScreen';
import CardDetailScreen from '@/Containers/Wallet/CardDetailScreen';
import TransactionDetailScreen from '@/Containers/Wallet/TransactionDetailScreen';
import CardSettingsScreen from '@/Containers/Wallet/CardSettingsScreen';
import CardLostStolen from '@/Containers/Wallet/CardLostStolen';
import AddReceiptScreen from '@/Containers/Wallet/Receipt/AddReceiptScreen';
import NoteInputScreen from '@/Containers/Wallet/NoteInputScreen';
import ViewReceiptScreen from '@/Containers/Wallet/Receipt/ViewReceiptScreen';
import NewPasswordScreen from '@/Containers/Profile/ChangePassword/NewPasswordScreen';
import ConfirmAuthScreen from '@/Containers/Onboarding/ConfirmAuthScreen';
import { SetBioPasscodeNavigator } from '@/Containers/Onboarding/BioPasscode/SetBioPasscodeNavigator';
import DeleteReceiptScreen from '@/Containers/Wallet/Receipt/DeleteReceiptScreen';
import EnterMobileScreen from '@/Containers/Onboarding/EnterMobileScreen';
import EnterOTPScreen from '@/Containers/Onboarding/EnterOTPScreen';
import { ActivateCardDigitEntryScreen } from '@/Containers/ActivateCard/ActivateCardDigitEntryScreen';
import { ActivateCardResultScreen } from '@/Containers/ActivateCard/ActivateCardResultScreen';
import DevMenuScreen from '@/Containers/DevMenu/DevMenuScreen';
import { IconDemoScreen } from '@/Containers/DevMenu/IconDemoScreen';
import UpdateAccountScreen from '@/Containers/Profile/UpdateAccountScreen';
import UpdateMobileScreen from '@/Containers/Profile/UpdateMobileScreen';
import UpdateAddressScreen from '@/Containers/Profile/UpdateAddressScreen';
import UpdatedTermsAndConditionsScreen from '@/Containers/Onboarding/UpdatedTermsAndConditionsScreen';
import { AdminNavigator as AdminStack } from '@/Navigators/Admin/AdminNavigator';
import CardSpendControl from '@/Containers/Wallet/CardSpendControl';
import { useAuthentication } from '@/Hooks/useAuthentication';
import useRequireBioOrPasscodeSetup from '@/Hooks/useRequireBioOrPasscodeSetup';
// import useRequire2FA from '@/Hooks/useRequire2FA';
import { useUser } from '@/Queries';
import { sharedStackHeaderConfig } from '@/Helpers/NavigationHelpers';

const Stack = createStackNavigator<MainStackParamTypes>();

const transparentModal: StackNavigationOptions = {
  presentation: 'transparentModal',
  gestureEnabled: false,
};

const ActivateCardStack = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      initialRouteName={MainScreens.ActivateCardDigitEntry}
      screenOptions={{
        ...sharedStackHeaderConfig('', t('general.back')),
      }}
    >
      <Stack.Screen
        name={MainScreens.ActivateCardDigitEntry}
        component={ActivateCardDigitEntryScreen}
      />
      <Stack.Screen
        name={MainScreens.ActivateCardResult}
        component={ActivateCardResultScreen}
        options={{ headerShown: true, headerTitle: '', headerLeft: () => null }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => (
  <Stack.Navigator
    initialRouteName={MainScreens.ProfileScreen}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name={MainScreens.ProfileScreen} component={ProfileScreen} />
    <Stack.Screen name={MainScreens.UpdateAccount} component={UpdateAccountScreen} />
    <Stack.Screen name={MainScreens.UpdateMobile} component={UpdateMobileScreen} />
    <Stack.Screen name={MainScreens.UpdateAddress} component={UpdateAddressScreen} />
    <Stack.Screen name={MainScreens.ChangePassword} component={ChangePasswordScreen} />
    <Stack.Screen name={MainScreens.NewPassword} component={NewPasswordScreen} />
    <Stack.Screen name={MainScreens.NotificationSettings} component={NotificationSettingScreen} />
    <Stack.Screen name={MainScreens.LoginOptions} component={LoginOptionsScreen} />
    <Stack.Screen name={MainScreens.ActivateCard} component={ActivateCardStack} />
    <Stack.Screen name={MainScreens.LegalDocuments} component={LegalDocumentsScreen} />
    <Stack.Screen name={MainScreens.Admin} component={AdminStack} />
  </Stack.Navigator>
);

const WalletStack = () => (
  <Stack.Navigator initialRouteName={MainScreens.Wallet} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={MainScreens.Wallet} component={WalletScreen} />
    <Stack.Screen name={MainScreens.Notifications} component={NotificationScreen} />
    <Stack.Screen
      name={MainScreens.TransactionDetails}
      component={TransactionDetailScreen}
      options={transparentModal}
    />
    <Stack.Screen name={MainScreens.NoteInput} component={NoteInputScreen} />
    <Stack.Screen name={MainScreens.Profile} component={ProfileStack} />

    <Stack.Screen
      name={MainScreens.CardDetails}
      component={CardDetailScreen}
      options={transparentModal}
    />
    <Stack.Screen name={MainScreens.CardSettings} component={CardSettingsScreen} />
    <Stack.Screen name={MainScreens.CardLostStolen} component={CardLostStolen} />
    <Stack.Screen
      name={MainScreens.AddReceipt}
      component={AddReceiptScreen}
      options={transparentModal}
    />
    <Stack.Screen
      name={MainScreens.ViewReceipt}
      component={ViewReceiptScreen}
      options={transparentModal}
    />
    <Stack.Screen
      name={MainScreens.DeleteReceipt}
      component={DeleteReceiptScreen}
      options={transparentModal}
    />
    <Stack.Screen name={MainScreens.DevMenu} component={DevMenuScreen} />
    <Stack.Screen name={MainScreens.DevIconDemo} component={IconDemoScreen} />
    <Stack.Screen name={MainScreens.CardSpendControl} component={CardSpendControl} />
  </Stack.Navigator>
);

const MainNavigator = () => {
  const { loading, authed, passcodeEnabled, biometricsEnabled, isLoggingOut } = useAuthentication();

  // TODO: Reenable 2FA setup prompt when backend is fixed
  // const { loading: loading2FA, shouldAct: needs2FA } = useRequire2FA();
  const loading2FA = false;
  const needs2FA = false;
  const { loading: loadingBioPasscode, shouldAct: needsBioPasscode } =
    useRequireBioOrPasscodeSetup();
  const { data: user } = useUser();

  if (loading || !user || loading2FA || loadingBioPasscode || isLoggingOut) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-secondary`}>
        <StatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" />
        <ActivityIndicator />
      </View>
    );
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
      ) : (
        <Stack.Screen name={MainScreens.Home} component={WalletStack} />
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
