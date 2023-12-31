import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import { BioPasscodeNavigationProps, BioPasscodeScreens } from '../../BioPasscode/BioPasscodeTypes';
import { PasscodeView } from './PasscodeView';
import { longFeedback } from '@/Helpers/HapticFeedback';
import { useAuthentication } from '@/Hooks/useAuthentication';
import { CSText } from '@/Components';
import tw from '@/Styles/tailwind';

export const PasscodeConfirm = ({
  route,
}: BioPasscodeNavigationProps<BioPasscodeScreens.Confirm>) => {
  const { initialPasscode } = route.params;
  const { setPasscode, loggedIn, setLoggedIn } = useAuthentication();

  const [error, setCurrentError] = useState<string>();
  const { t } = useTranslation();

  const onPasscodeComplete = async (newPasscode: string) => {
    if (newPasscode === initialPasscode) {
      await setPasscode(newPasscode);
      if (!loggedIn) {
        setLoggedIn(true);
      }
      Toast.show({
        type: 'success',
        text1: t('profile.updateAuth.success', { method: 'PIN' }),
      });
    } else {
      setCurrentError(t('loginOptions.passcode.tryAgain'));
      longFeedback();
    }
  };

  return (
    <PasscodeView
      title={
        <CSText style={tw`font-telegraf text-2xl text-white mb-3 mt-6`}>
          {t('loginOptions.passcode.confirmYour')}
          <CSText style={tw`font-telegraf text-2xl mb-3 mt-6 text-primary`}>
            {t('loginOptions.passcode.fourDigitPasscode')}
          </CSText>
        </CSText>
      }
      errorTitle={t('loginOptions.passcode.mismatch')}
      error={error}
      onPasscodeChanged={() => setCurrentError('')}
      onSuccessFinished={onPasscodeComplete}
    />
  );
};
