import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { AdminProvider } from '@/Services/Admin/AdminProvider';

import { WalletScreens, WalletStackParamTypes } from '@/Navigators/Wallet/WalletNavigatorTypes';

import WalletScreen from '@/Containers/Wallet/WalletScreen';
import NotificationsScreen from '@/Containers/Notifications/NotificationScreen';
import CardSettingsScreen from '@/Containers/Wallet/CardSettingsScreen';
import CardLostStolen from '@/Containers/Wallet/CardLostStolen';
import CardSpendControl from '@/Containers/Wallet/CardSpendControl';
import CardDetailScreen from '@/Containers/Wallet/CardDetailScreen';

// Transaction Screens
import TransactionDetailScreen from '@/Containers/Wallet/TransactionDetailScreen';
import NoteInputScreen from '@/Containers/Wallet/NoteInputScreen';
import AddReceiptScreen from '@/Containers/Wallet/Receipt/AddReceiptScreen';
import ViewReceiptScreen from '@/Containers/Wallet/Receipt/ViewReceiptScreen';
import DeleteReceiptScreen from '@/Containers/Wallet/Receipt/DeleteReceiptScreen';

const Stack = createNativeStackNavigator<WalletStackParamTypes>();

export const transparentModal: NativeStackNavigationOptions = {
  presentation: 'containedTransparentModal',
  gestureEnabled: false,
};

export const WalletNavigator = () => (
  <AdminProvider isAdmin={false}>
    <Stack.Navigator initialRouteName={WalletScreens.Home} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={WalletScreens.Home} component={WalletScreen} />
      <Stack.Screen name={WalletScreens.Notifications} component={NotificationsScreen} />
      <Stack.Screen name={WalletScreens.CardSettings} component={CardSettingsScreen} />
      <Stack.Screen name={WalletScreens.CardLostStolen} component={CardLostStolen} />
      <Stack.Screen name={WalletScreens.CardSpendControl} component={CardSpendControl} />
      <Stack.Screen
        name={WalletScreens.CardDetails}
        component={CardDetailScreen}
        options={{
          animation: 'fade',
        }}
      />

      {/* Modal Group */}
      <Stack.Group screenOptions={transparentModal}>
        <Stack.Screen name={WalletScreens.TransactionDetails} component={TransactionDetailScreen} />
        <Stack.Screen name={WalletScreens.NoteInput} component={NoteInputScreen} />
        <Stack.Screen name={WalletScreens.AddReceipt} component={AddReceiptScreen} />
        <Stack.Screen name={WalletScreens.ViewReceipt} component={ViewReceiptScreen} />
        <Stack.Screen name={WalletScreens.DeleteReceipt} component={DeleteReceiptScreen} />
      </Stack.Group>
    </Stack.Navigator>
  </AdminProvider>
);
