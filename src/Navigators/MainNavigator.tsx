import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import WalletScreen from '@/Containers/Wallet/WalletScreen';
import ProfileScreen from '@/Containers/Profile/ProfileScreen';
import ChangePasswordScreen from '@/Containers/Profile/ChangePasswordScreen';
import NotificationSettingScreen from '@/Containers/Profile/NotificationSettingsScreen';
import AuditLogScreen from '@/Containers/Profile/AuditLog';
import NotificationScreen from '@/Containers/Notifications/NotificationScreen';
import CardDetailScreen from '@/Containers/Wallet/CardDetailScreen';
import CardInfoScreen from '@/Containers/Wallet/CardInfoScreen';
import TransactionDetailScreen from '@/Containers/Wallet/TransactionDetailScreen';
import CardSpendControlsScreen from '@/Containers/Wallet/CardSpendControlsScreen';
import CardSettingsScreen from '@/Containers/Wallet/CardSettingsScreen';
import CardLostStolen from '@/Containers/Wallet/CardLostStolen';
import AddCardScreen from '@/Containers/Wallet/AppleWallet/AddCardScreen';
import WalletTermsScreen from '@/Containers/Wallet/AppleWallet/WalletTermsScreen';
import SetCardAsDefaultScreen from '@/Containers/Wallet/AppleWallet/SetCardAsDefaultScreen';
import AddReceiptScreen from '@/Containers/Wallet/Receipt/AddReceiptScreen';
import NoteInputScreen from '@/Containers/Wallet/NoteInputScreen';
import ViewReceiptScreen from '@/Containers/Wallet/Receipt/ViewReceiptScreen';
import NewPasswordScreen from '@/Containers/Profile/NewPasswordScreen';
import ChangePasswordMessage from '@/Containers/Profile/ChangePasswordMessage';
import SetBiometricsOrPinScreen from '@/Containers/Onboarding/SetBiometricsOrPinScreen';
import { MainScreens, MainStackParamTypes } from './NavigatorTypes';
import LoginShortcutScreen from '@/Containers/Onboarding/LoginShortcutScreen';
import DeleteReceiptScreen from '@/Containers/Wallet/Receipt/DeleteReceiptScreen';

const Stack = createStackNavigator<MainStackParamTypes>();

const transparentModal: StackNavigationOptions = {
  presentation: 'transparentModal',
  gestureEnabled: false,
};

const ProfileStack = () => (
  <Stack.Navigator
    initialRouteName={MainScreens.ProfileScreen}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name={MainScreens.ProfileScreen} component={ProfileScreen} />
    <Stack.Screen name={MainScreens.ChangePassword} component={ChangePasswordScreen} />
    <Stack.Screen name={MainScreens.NewPassword} component={NewPasswordScreen} />
    <Stack.Screen name={MainScreens.ChangePasswordMessage} component={ChangePasswordMessage} />
    <Stack.Screen name={MainScreens.NotificationSettings} component={NotificationSettingScreen} />
    <Stack.Screen name={MainScreens.AuditLog} component={AuditLogScreen} />
  </Stack.Navigator>
);

const WalletStack = () => (
  <Stack.Navigator initialRouteName={MainScreens.Wallet} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={MainScreens.SetBiometricsOrPin} component={SetBiometricsOrPinScreen} />
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

    {/* Apple Wallet Mock UI Screens */}
    <Stack.Screen name={MainScreens.AddCardToAppleWallet} component={AddCardScreen} />
    <Stack.Screen
      name={MainScreens.WalletTerms}
      component={WalletTermsScreen}
      options={{ presentation: 'modal' }}
    />
    <Stack.Screen name={MainScreens.SetCardAsDefault} component={SetCardAsDefaultScreen} />
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
  </Stack.Navigator>
);

const MainNavigator = () => (
  <Stack.Navigator initialRouteName={MainScreens.Home} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={MainScreens.Home} component={WalletStack} />
    <Stack.Screen name={MainScreens.LoginShortcut} component={LoginShortcutScreen} />
  </Stack.Navigator>
);

export default MainNavigator;
