export enum ActivateCardScreens {
  DigitEntry = 'Activate Card Digit Entry',
  Result = 'Activate Card Result',
}

export type ActivateCardStackParamTypes = {
  [ActivateCardScreens.DigitEntry]: undefined;
  [ActivateCardScreens.Result]: { lastFour: string };
};
