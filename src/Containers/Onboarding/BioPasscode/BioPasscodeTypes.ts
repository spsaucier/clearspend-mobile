import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import {
  MainStackParamTypes,
  MainScreens,
  TopScreens,
  TopParams,
} from '@/Navigators/NavigatorTypes';

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
  NativeStackNavigationProp<BioPasscodeParams, BioPasscodeScreens>,
  CompositeNavigationProp<
    NativeStackNavigationProp<MainStackParamTypes, MainScreens>,
    NativeStackNavigationProp<TopParams, TopScreens>
  >
>;

export interface BioPasscodeNavigationProps<Screen extends BioPasscodeScreens> {
  navigation: BioPasscodeNavigationProp;
  route: RouteProp<BioPasscodeParams, Screen>;
}
