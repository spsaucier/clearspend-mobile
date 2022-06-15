import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum ProfileScreens {
  Home = 'Profile Home',
  UpdateAccount = 'Profile Update Account',
  UpdateMobile = 'Profile Update Phone',
  UpdateAddress = 'Profile Update Address',
  LoginOptions = 'Profile Log In Options',
  LegalDocuments = 'Profile Legal Documents',
  ActivateCard = 'Profile Activate Card',
  ChangePassword = 'Profile Change Password',
  NewPassword = 'Profile New Password',
  NotificationSettings = 'Profile Notification Settings',
  DevMenu = 'Profile Dev Menu',
  DevIconDemo = 'Profile Dev Icon Demo',
}

export type ProfileStackParamTypes = {
  [ProfileScreens.Home]: undefined;
  [ProfileScreens.UpdateAccount]: undefined;
  [ProfileScreens.UpdateMobile]: undefined;
  [ProfileScreens.UpdateAddress]: undefined;
  [ProfileScreens.LoginOptions]: undefined;
  [ProfileScreens.LegalDocuments]: undefined;
  [ProfileScreens.ActivateCard]: undefined;
  [ProfileScreens.ChangePassword]: undefined;
  [ProfileScreens.NewPassword]: { currentPassword: string };
  [ProfileScreens.NotificationSettings]: undefined;
  [ProfileScreens.DevMenu]: undefined;
  [ProfileScreens.DevIconDemo]: undefined;
};

export type ProfileStackProps = NativeStackNavigationProp<ProfileStackParamTypes, ProfileScreens>;
