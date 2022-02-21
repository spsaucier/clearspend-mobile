import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import { MainScreens, MainStackParamTypes } from './NavigatorTypes';
import { CSText } from '@/Components';
import tw from '@/Styles/tailwind';
import { ChevronIconLeft } from '@/Components/Icons';

// Screens
import WalletScreen from '@/Containers/Wallet/WalletScreen';
import ProfileScreen from '@/Containers/Profile/ProfileScreen';
import ChangePasswordScreen from '@/Containers/Profile/ChangePasswordScreen';
import NotificationSettingScreen from '@/Containers/Profile/NotificationSettingsScreen';
import LoginOptionsScreen from '@/Containers/Profile/LoginOptions';
import LegalDocumentsScreen from '@/Containers/Profile/LegalDocuments';
import NotificationScreen from '@/Containers/Notifications/NotificationScreen';
import CardDetailScreen from '@/Containers/Wallet/CardDetailScreen';
import CardInfoScreen from '@/Containers/Wallet/CardInfoScreen';
import TransactionDetailScreen from '@/Containers/Wallet/TransactionDetailScreen';
import CardSpendControlsScreen from '@/Containers/Wallet/CardSpendControlsScreen';
import CardSettingsScreen from '@/Containers/Wallet/CardSettingsScreen';
import CardLostStolen from '@/Containers/Wallet/CardLostStolen';
import AddReceiptScreen from '@/Containers/Wallet/Receipt/AddReceiptScreen';
import NoteInputScreen from '@/Containers/Wallet/NoteInputScreen';
import ViewReceiptScreen from '@/Containers/Wallet/Receipt/ViewReceiptScreen';
import NewPasswordScreen from '@/Containers/Profile/NewPasswordScreen';
import ConfirmAuthScreen from '@/Containers/Onboarding/ConfirmAuthScreen';
import { SetBioPasscodeNavigator } from '@/Containers/Onboarding/BioPasscode/SetBioPasscodeNavigator';
import DeleteReceiptScreen from '@/Containers/Wallet/Receipt/DeleteReceiptScreen';
import EnterMobileScreen from '@/Containers/Onboarding/EnterMobileScreen';
import EnterOTPScreen from '@/Containers/Onboarding/EnterOTPScreen';
import { ActivateCardDigitEntryScreen } from '@/Containers/ActivateCard/ActivateCardDigitEntryScreen';
import { ActivateCardGetStartedScreen } from '@/Containers/ActivateCard/ActivateCardGetStartedScreen';
import { ActivateCardResultScreen } from '@/Containers/ActivateCard/ActivateCardResultScreen';
import DevMenuScreen from '@/Containers/DevMenu/DevMenuScreen';
import { IconDemoScreen } from '@/Containers/DevMenu/IconDemoScreen';
import UpdateAccountScreen from '@/Containers/Profile/UpdateAccountScreen';
import UpdateMobileScreen from '@/Containers/Profile/UpdateMobileScreen';
import UpdateAddressScreen from '@/Containers/Profile/UpdateAddressScreen';

const Stack = createStackNavigator<MainStackParamTypes>();

const transparentModal: StackNavigationOptions = {
  presentation: 'transparentModal',
  gestureEnabled: false,
};

const sharedStackHeaderConfig = (
  headerTitle: string,
  backButtonTitle: string,
): StackHeaderOptions => ({
  headerShadowVisible: false,
  headerLeft: ({ onPress }) => (
    <TouchableOpacity style={tw`flex-row items-center bg-tan ml-4`} onPress={onPress}>
      <ChevronIconLeft style={tw`m-2`} size={6} />
      <CSText style={tw`text-2xs tracking-widest mr-2`}>{backButtonTitle}</CSText>
    </TouchableOpacity>
  ),
  headerTitle,
  headerTitleAlign: 'left',
  headerStyle: tw`bg-white border-0`,
  headerTitleStyle: tw`font-montreal text-lg font-normal`,
});

const ActivateCardStack = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      initialRouteName={MainScreens.ActivateCardGetStarted}
      screenOptions={{
        ...sharedStackHeaderConfig(t('profile.profileMenu.activateCard'), t('general.back')),
      }}
    >
      <Stack.Screen
        name={MainScreens.ActivateCardGetStarted}
        component={ActivateCardGetStartedScreen}
      />
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
  </Stack.Navigator>
);

const WalletStack = () => (
  <Stack.Navigator initialRouteName={MainScreens.Wallet} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={MainScreens.SetBiometricsOrPasscode} component={SetBioPasscodeNavigator} />
    <Stack.Screen name={MainScreens.Wallet} component={WalletScreen} />
    <Stack.Screen name={MainScreens.Notifications} component={NotificationScreen} />
    <Stack.Screen
      name={MainScreens.CardInfo}
      component={CardInfoScreen}
      options={transparentModal}
    />
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
      options={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    />
    <Stack.Screen
      name={MainScreens.CardSpendControls}
      component={CardSpendControlsScreen}
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
  </Stack.Navigator>
);

const MainNavigator = () => (
  <Stack.Navigator initialRouteName={MainScreens.Home} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={MainScreens.Home} component={WalletStack} />
    <Stack.Screen name={MainScreens.ConfirmAuth} component={ConfirmAuthScreen} />
    <Stack.Screen name={MainScreens.EnterMobile} component={EnterMobileScreen} />
    <Stack.Screen name={MainScreens.EnterOTP} component={EnterOTPScreen} />
  </Stack.Navigator>
);

export default MainNavigator;
