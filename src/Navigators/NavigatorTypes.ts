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
  ForgotPassword = 'Forgot Password',
  Landing = 'Landing',
  Login = 'Login',
  LoginStack = 'Login Stack',
  SelectOrganization = 'Select Organization',
  SetPassword = 'Set Password',
}

export type AuthStackParamTypes = {
  [AuthScreens.Landing]: undefined;
  [AuthScreens.ForgotPassword]: undefined;
  [AuthScreens.Login]: undefined;
  [AuthScreens.LoginStack]: undefined;
  [AuthScreens.SelectOrganization]: undefined;
  [AuthScreens.SetPassword]: { changePasswordId: string; email: string; password: string };
};

export enum MainScreens {
  Tabs = 'Tabs',

  // Prompt before confirming logged in status
  ConfirmAuth = 'Confirm Auth with Biometrics or PIN',

  // Onboarding post-auth
  SetBiometricsOrPasscode = 'SetBiometricsOrPasscode',
  EnterMobile = 'Enter Mobile',
  EnterOTP = 'Confirm Mobile',
  OnboardingNotifications = 'Onboarding Notifications',

  ActivateCardDigitEntry = 'Activate Card Digit Entry',
  ActivateCardResult = 'Activate Card Result',

  UpdatedTermsAndConditionsScreen = 'Profile Updated Terms And Conditions',
}

export type MainStackParamTypes = {
  [MainScreens.Tabs]: undefined;

  // Prompt before confirming logged in status
  [MainScreens.ConfirmAuth]: undefined;

  // Onboarding post-auth
  [MainScreens.SetBiometricsOrPasscode]: undefined;
  [MainScreens.EnterMobile]: undefined;
  [MainScreens.EnterOTP]: { phone: string; nextScreen?: string };
  [MainScreens.UpdatedTermsAndConditionsScreen]: undefined;
  [MainScreens.OnboardingNotifications]: undefined;

  [MainScreens.ActivateCardDigitEntry]: undefined;
  [MainScreens.ActivateCardResult]: { lastFour: string };

  [MainScreens.UpdatedTermsAndConditionsScreen]: undefined;
};

export enum TabScreens {
  Wallet = 'Wallet',
  Admin = 'Admin',
  Profile = 'Profile',
}

export type TabStackParamTypes = {
  [TabScreens.Wallet]?: {
    initialFocusedCardId?: string;
    initialFocusCardIdx?: number;
  };
  [TabScreens.Admin]: undefined;
  [TabScreens.Profile]: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TopParams, AuthStackParamTypes, MainStackParamTypes {}
  }
}
