import { NavigatorScreenParams } from '@react-navigation/native';

export enum IssueCardScreens {
  CardType = 'Issue Card Card Type',
  Employee = 'Issue Card Employee',
  CardDetails = 'Issue Card Card Details',
  Address = 'Issue Card Address',
  NewAddress = 'Issue Card New Address',
  Allocation = 'Issue Card Allocation',
  SpendControls = 'Issue Card Spend Controls',
  CardRequest = 'Issue Card Request',
  CardConfirmation = 'Issue Card Card Confirmation',
}

export type IssueCardStackParamTypes = {
  [IssueCardScreens.CardType]: undefined;
  [IssueCardScreens.Employee]: undefined;
  [IssueCardScreens.CardDetails]: undefined;
  [IssueCardScreens.Address]: undefined;
  [IssueCardScreens.NewAddress]: undefined;
  [IssueCardScreens.Allocation]: undefined;
  [IssueCardScreens.SpendControls]: undefined;
  [IssueCardScreens.CardRequest]: undefined;
  [IssueCardScreens.CardConfirmation]: undefined;
};

export enum AdminScreens {
  Home = 'Admin Home',
  IssueCard = 'Issue Card',
}

export type AdminStackParamTypes = {
  [AdminScreens.Home]: undefined;
  [AdminScreens.IssueCard]?: NavigatorScreenParams<IssueCardStackParamTypes>;
};
