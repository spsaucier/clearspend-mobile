import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AdminScreens, AdminStackParamTypes } from '@/Navigators/Admin/AdminNavigatorTypes';

export enum WalletScreens {
  Home = 'Wallet Home',
  Notifications = 'Wallet Notifications',
  CardSettings = 'Wallet Card Settings',
  CardLostStolen = 'Wallet Card Lost Stolen',
  CardSpendControl = 'Wallet Spend Control',
  CardDetails = 'Wallet Card Details',
  TransactionDetails = 'Wallet Transaction Details',
  NoteInput = 'Wallet Note Input',
  AddReceipt = 'Wallet Add Receipt',
  ViewReceipt = 'Wallet View Receipt',
  DeleteReceipt = 'Wallet Delete Receipt',
}

export type WalletStackParamTypes = {
  [WalletScreens.Home]?: {
    initialFocusedCardId?: string;
    initialFocusCardIdx?: number;
  };
  [WalletScreens.Notifications]: undefined;
  [WalletScreens.CardSettings]: { cardId: string };
  [WalletScreens.CardLostStolen]: { cardId: string };
  [WalletScreens.CardSpendControl]: { cardId: string };
  [WalletScreens.CardDetails]: { cardId: string };
  [WalletScreens.TransactionDetails]: { transactionId: string };
  [WalletScreens.NoteInput]: {
    accountActivityId: string;
    notes: string | null;
    expenseCategoryId: string | undefined;
  };
  [WalletScreens.AddReceipt]: { accountActivityId: string };
  [WalletScreens.ViewReceipt]: { accountActivityId: string; receiptIds: string[] };
  [WalletScreens.DeleteReceipt]: { accountActivityId: string; receiptId: string };
};

export type WalletStackProps = NativeStackNavigationProp<WalletStackParamTypes, WalletScreens>;

export type TransactionStackProps = NativeStackNavigationProp<
  AdminStackParamTypes & WalletStackParamTypes,
  AdminScreens | WalletScreens
>;
