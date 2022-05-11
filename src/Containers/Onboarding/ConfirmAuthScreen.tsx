import React, { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import tw from '@/Styles/tailwind';
import { CSText, FocusAwareStatusBar } from '@/Components';
import { Logo } from '@/Components/Svg/Logo';

import { useAuthentication } from '@/Hooks/useAuthentication';
import { PasscodeView } from './Components/Passcode/PasscodeView';
import { PromptBio } from './Components/PromptBio';
import { longFeedback } from '@/Helpers/HapticFeedback';

const ConfirmAuthScreen = () => {
  const { t } = useTranslation();
  const {
    setAuthed,
    logout,
    passcodeEnabled,
    biometricsEnabled,
    verifyPasscode,
    failedAttempts,
    clearFailedAttempts,
    loading,
  } = useAuthentication();
  const [error, setCurrentError] = useState<string>();

  const onSuccess = () => {
    setAuthed(true);
  };

  const onPasscodeComplete = async (newPasscode: string) => {
    if (await verifyPasscode(newPasscode)) {
      clearFailedAttempts();
      onSuccess();
    } else {
      setCurrentError(t('loginOptions.passcode.tryAgain'));
      longFeedback();
      if (failedAttempts > 4) {
        logout();
      }
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`} edges={['top', 'bottom']}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        enableResetScrollToCoords={false}
        style={tw`flex-1`}
        contentContainerStyle={tw`flex-1 justify-between`}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={tw`p-5 justify-center pb-0`}>
            <Logo style={tw`w-30`} />
          </View>

          {!loading && passcodeEnabled ? (
            <View style={tw.style('p-5 pt-0 -mt-12')}>
              <PasscodeView
                title={
                  <CSText style={tw`font-telegraf text-2xl text-white mb-3`}>
                    {t('loginOptions.passcode.enterYour')}
                    <CSText style={tw`font-telegraf text-2xl mb-3 text-primary`}>
                      {t('loginOptions.passcode.fourDigitPasscode')}
                    </CSText>
                  </CSText>
                }
                errorTitle={t('loginOptions.passcode.incorrect')}
                error={error}
                onPasscodeChanged={() => setCurrentError('')}
                onSuccessFinished={onPasscodeComplete}
              />
            </View>
          ) : null}
        </View>
        {!loading && biometricsEnabled ? (
          <View style={tw`flex-1 items-center justify-center`}>
            <PromptBio onSuccess={onSuccess} promptOnMount />
          </View>
        ) : null}
        <View style={tw`flex-row justify-center items-center p-5 mb-5`}>
          <View style={tw`flex-1 ml-3`}>
            <CSText style={tw`text-base text-white text-center`}>
              {t('login.shortcut.havingTroubleLoggingIn')}
            </CSText>
            <CSText
              style={tw`text-base text-primary text-center`}
              onPress={() => {
                logout();
              }}
            >
              {t('login.shortcut.loginWithEmailPassword')}
            </CSText>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ConfirmAuthScreen;
