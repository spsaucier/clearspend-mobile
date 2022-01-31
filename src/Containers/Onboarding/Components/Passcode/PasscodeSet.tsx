import React from 'react';
import { useTranslation } from 'react-i18next';
import { PasscodeView } from './PasscodeView';
import { BioPasscodeNavigationProps, BioPasscodeScreens } from '../../BioPasscode/BioPasscodeTypes';
import useNoBackPress from '@/Hooks/useNoBackPress';
import { CSText } from '@/Components';
import tw from '@/Styles/tailwind';

export const PasscodeSet = ({
  navigation: { navigate },
}: BioPasscodeNavigationProps<BioPasscodeScreens.Set>) => {
  const { t } = useTranslation();
  useNoBackPress();

  const onPasscodeComplete = async (newPasscode: string) => {
    navigate(BioPasscodeScreens.Confirm, { initialPasscode: newPasscode });
  };

  return (
    <PasscodeView
      title={(
        <CSText style={tw`font-telegraf text-2xl text-white mb-3 mt-6`}>
          {t('loginOptions.passcode.createYour')}
          <CSText style={tw`font-telegraf text-2xl mb-3 mt-6 text-primary`}>{t('loginOptions.passcode.fourDigitPasscode')}</CSText>
        </CSText>
      )}
      onSuccessFinished={onPasscodeComplete}
    />
  );
};
