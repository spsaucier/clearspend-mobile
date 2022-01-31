import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { MainStackParamTypes, MainScreens } from '../../../Navigators/NavigatorTypes';

export enum BioPasscodeScreens {
  SetBioOrPasscode = 'SetBioOrPasscode',
  Set = 'Set',
  Confirm = 'Confirm',
}

export type BioPasscodeParams = {
  [BioPasscodeScreens.SetBioOrPasscode]: undefined;
  [BioPasscodeScreens.Set]: undefined;
  [BioPasscodeScreens.Confirm]: { initialPasscode: string };
};

export type BioPasscodeNavigationProp = CompositeNavigationProp<
  StackNavigationProp<BioPasscodeParams, BioPasscodeScreens>,
  StackNavigationProp<MainStackParamTypes, MainScreens>
>;

export interface BioPasscodeNavigationProps<Screen extends BioPasscodeScreens> {
  navigation: BioPasscodeNavigationProp;
  route: RouteProp<BioPasscodeParams, Screen>;
}
