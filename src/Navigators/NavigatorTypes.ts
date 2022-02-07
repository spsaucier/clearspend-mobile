import { Session } from '@/Store/Session';

export enum TopScreens {
  Auth = 'Auth',
  Main = 'Main',
  Startup = 'Startup',
}

export type TopParams = {
  [TopScreens.Auth]: undefined;
  [TopScreens.Main]: undefined;
  [TopScreens.Startup]: undefined;
};

export enum AuthScreens {
  EnterMobile = 'Enter Mobile',
  ForgotPassword = 'Forgot Password',
  Landing = 'Landing',
  Login = 'Login',
  LoginStack = 'Login Stack',
  SelectOrganization = 'Select Organization',
  SetPassword = 'Set Password',
  VerifyAccount = 'Verify Account',
  EnterOTP = 'Enter OTP',
}

export type AuthStackParamTypes = {
  [AuthScreens.Landing]: undefined;
  [AuthScreens.EnterMobile]: { sessionPayload: Session }; // { accessToken: string; userId: string; refreshToken: string; expires_in: string };
  [AuthScreens.ForgotPassword]: undefined;
  [AuthScreens.Login]: undefined;
  [AuthScreens.LoginStack]: undefined;
  [AuthScreens.SelectOrganization]: undefined;
  [AuthScreens.SetPassword]: { changePassId: string; email: string };
  [AuthScreens.VerifyAccount]: undefined;
  [AuthScreens.EnterOTP]: { sessionPayload: Session };
};

export enum MainScreens {
  Home = 'Home',

  // Prompt before confirming logged in status
  ConfirmAuth = 'Confirm Auth with Biometrics or PIN',

  // Onboarding post-auth
  SetBiometricsOrPasscode = 'SetBiometricsOrPasscode',

  // Profile & Settings
  AuditLog = 'Audit Log',
  ActivateCard = 'Activate Card',
  ChangePassword = 'Change Password',
  ChangePasswordMessage = 'Change Password Message',
  NewPassword = 'New Password',
  NotificationSettings = 'Notification Settings',
  Profile = 'Profile',
  ProfileScreen = 'Profile Screen',

  // Wallet and Cards
  AddReceipt = 'Add Receipt',
  CardDetails = 'Card Details',
  CardInfo = 'Card Info',
  CardLostStolen = 'Card Lost Stolen',
  CardSettings = 'Card Settings',
  CardSpendControls = 'Card Spend Controls',
  NoteInput = 'Note Input',
  Notifications = 'Notifications',
  TransactionDetails = 'Transaction Details',
  ViewReceipt = 'View Receipt',
  DeleteReceipt = 'Delete Receipt',
  Wallet = 'Wallet',

  // Apple Wallet Mock UI Screens
  AddCardToAppleWallet = 'Add Card To Apple Wallet',
  AppleWallet = 'Apple Wallet',
  SetCardAsDefault = 'Set Card As Default',
  WalletTerms = 'Wallet Terms',
}

export type MainStackParamTypes = {
  [MainScreens.Home]: undefined;

  // Prompt before confirming logged in status
  [MainScreens.ConfirmAuth]: undefined;

  // Onboarding post-auth
  [MainScreens.SetBiometricsOrPasscode]: undefined;

  // Profile & Settings
  [MainScreens.AuditLog]: undefined;
  [MainScreens.ActivateCard]: undefined;
  [MainScreens.ChangePassword]: undefined;
  [MainScreens.ChangePasswordMessage]: undefined;
  [MainScreens.NewPassword]: undefined;
  [MainScreens.NotificationSettings]: undefined;
  [MainScreens.Profile]: undefined;
  [MainScreens.ProfileScreen]: undefined;

  // Wallet and Cards
  [MainScreens.AddReceipt]: { accountActivityId: string; cardId: string };
  [MainScreens.CardDetails]: { cardId: string };
  [MainScreens.CardInfo]: { cardId: string };
  [MainScreens.CardLostStolen]: { cardId: string };
  [MainScreens.CardSettings]: { cardId: string };
  [MainScreens.CardSpendControls]: { cardId: string };
  [MainScreens.NoteInput]: { transactionId: string; note: string | null };
  [MainScreens.Notifications]: undefined;
  [MainScreens.TransactionDetails]: { cardId: string; transactionId: string };
  [MainScreens.ViewReceipt]: { accountActivityId: string; receiptIds: string[]; cardId: string };
  [MainScreens.DeleteReceipt]: { cardId: string; accountActivityId: string; receiptId: string };
  [MainScreens.Wallet]: undefined;

  // Apple Wallet Mock UI Screens
  [MainScreens.AddCardToAppleWallet]: { cardId: string; termsAccepted: boolean };
  [MainScreens.AppleWallet]: { cardId: string; termsAccepted: boolean };
  [MainScreens.SetCardAsDefault]: { cardId: string };
  [MainScreens.WalletTerms]: { cardId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TopParams, AuthStackParamTypes, MainStackParamTypes {}
  }
}
