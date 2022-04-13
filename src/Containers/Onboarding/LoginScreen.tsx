import React, { createRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Keyboard, Linking, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { useMMKVBoolean } from 'react-native-mmkv';
import CookieManager from '@react-native-cookies/cookies';
import tw from '@/Styles/tailwind';
import { Button, CSText, FocusAwareStatusBar } from '@/Components';
import { CSTextInput } from '@/Components/TextInput';
import { Logo } from '@/Components/Svg/Logo';
import { login, login2FA } from '@/Services/Auth';

import { Session, updateSession } from '@/Store/Session';
// import { ClearSpendIcon } from '@/Components/Svg/ClearSpendIcon';
import { mixpanel } from '@/Services/utils/analytics';
import { AuthScreens } from '@/Navigators/NavigatorTypes';
import { useAuthentication } from '@/Hooks/useAuthentication';
import { OTPView } from './OTPView';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
import { SHOW_2FA_PROMPT_KEY } from '@/Store/keys';
import { Constants } from '@/consts';
import { LoginTitle } from './Components/OnboardingScreenTitle';
import { navigateAndReset } from '@/Navigators/Root';

const LoginScreen = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show2faEntry, setShow2faEntry] = useState('');
  const [twoFactorId, setTwoFactorId] = useState('');
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [authError, setError] = useState<string>();
  const { setLoggedIn } = useAuthentication();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const passwordRef = createRef<TextInput>();
  const [, setShow2faPrompt] = useMMKVBoolean(SHOW_2FA_PROMPT_KEY);

  const handleError = (ex: any) => {
    if (ex.status === 404) {
      setError(t('login.invalidCredentials'));
    }
    if (ex?.fieldErrors?.methodId?.[0]?.code === '[invalid]methodId') {
      Toast.show({
        type: 'error',
        text1:
          'Invalid two-factor auth configuration. Please contact ClearSpend support to resolve.',
      });
    } else if (ex.message) {
      Toast.show({
        type: 'error',
        text1: ex.message,
      });
    }
    setProcessing(false);
    setLoginButtonDisabled(false);
  };

  const loginSuccess = (res: Session) => {
    mixpanel.track('Login');
    const sessionPayload = res;
    setLoggedIn(true);
    dispatch(updateSession(sessionPayload));

    navigateAndReset('Main');
  };

  const handleLogin = async (isResend?: boolean) => {
    Keyboard.dismiss();
    setError(undefined);
    setProcessing(true);
    setLoginButtonDisabled(true);
    await CookieManager.clearAll();
    try {
      const res = await login(email, password);
      setProcessing(false);
      setLoginButtonDisabled(false);
      if ('accessToken' in res) {
        setShow2faPrompt(true);
        loginSuccess(res);
      } else if ('changePasswordId' in res) {
        const { changePasswordId } = res;
        navigate(AuthScreens.SetPassword, { changePasswordId, email, password });
      } else if ('twoFactorMethod' in res) {
        setTwoFactorId(res.twoFactorId);
        setShow2faEntry(res.twoFactorMethod);
        if (isResend) {
          Toast.show({
            type: 'success',
            text1: 'Code re-sent to your phone',
          });
        }
      }
    } catch (e) {
      handleError(e);
    }
  };

  const handle2faLogin = async (code: string) => {
    Keyboard.dismiss();

    setProcessing(true);
    setLoginButtonDisabled(true);

    try {
      const res = await login2FA(twoFactorId, code);
      if ('accessToken' in res) {
        setProcessing(false);
        setLoginButtonDisabled(false);
        loginSuccess(res);
      } else if ('changePasswordId' in res) {
        const { changePasswordId } = res;
        navigate(AuthScreens.SetPassword, { changePasswordId, email, password });
      }
    } catch {
      Toast.show({
        type: 'error',
        text1: t('login.twoFactor.error'),
      });
      setProcessing(false);
      setLoginButtonDisabled(false);
    }
  };

  useEffect(() => {
    if (!!email && !!password) {
      setLoginButtonDisabled(!email && !password);
    } else {
      setLoginButtonDisabled(true);
    }
  }, [email, password]);

  const launchForgotPassword = () =>
    Linking.canOpenURL(Constants.FORGOT_PASSWORD_URL).then((canOpen) => {
      if (canOpen) Linking.openURL(Constants.FORGOT_PASSWORD_URL);
    });

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`} edges={['top', 'bottom']}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        enableResetScrollToCoords={false}
        style={tw`flex-1`}
        contentContainerStyle={tw`justify-between`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`p-5 justify-center`}>
          {show2faEntry ? (
            <View style={tw`flex-1`}>
              <BackButtonNavigator onBackPress={() => setShow2faEntry('')} />
              <View style={tw`mb-5 h-1/2`}>
                <OTPView
                  title={
                    <LoginTitle
                      titlePart1={t(`otp.titlePart1`)}
                      titlePart2={t(`otp.titlePart2`)}
                      titlePart3={t(`otp.titlePart3`)}
                    />
                  }
                  error={!!authError}
                  errorTitle={t('otp.incorrect')}
                  onPasscodeChanged={() => setError(undefined)}
                  onSuccessFinished={handle2faLogin}
                />
              </View>
              <TouchableOpacity
                onPress={() => handleLogin(true)}
                testID="resendOtpLink"
                disabled={loginButtonDisabled}
              >
                <CSText style={tw`text-sm text-primary mt-20 self-center`}>
                  {t('otp.resendCode')}
                </CSText>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Logo style={tw`w-30 mb-3`} />
              <CSText
                style={tw.style('text-4xl text-white mb-10 mt-6 font-telegraf leading-10', {
                  fontWeight: '300',
                })}
              >
                {t('login.heading')}
              </CSText>
              <View>
                <CSTextInput
                  label={t('login.emailLabel')}
                  placeholder={t('login.emailPlaceholder')}
                  keyboardType="email-address"
                  containerStyle={tw`mb-8`}
                  onChangeText={(value) => setEmail(value)}
                  value={email}
                  onSubmitEditing={() => passwordRef?.current?.focus()}
                  returnKeyType="next"
                  autoFocus
                />

                <CSTextInput
                  ref={passwordRef}
                  label={t('login.passwordLabel')}
                  returnKeyType="done"
                  placeholder={t('login.passwordPlaceholder')}
                  keyboardType="default"
                  containerStyle={tw`mb-4`}
                  onChangeText={(value) => setPassword(value)}
                  value={password}
                  secureTextEntry
                  onSubmitEditing={() => handleLogin()}
                />

                <View style={tw`items-center mb-4`}>
                  {authError && <CSText style={tw`text-white `}>{authError}</CSText>}
                </View>

                <Button
                  onPress={() => handleLogin()}
                  disabled={loginButtonDisabled}
                  loading={processing}
                >
                  {t('login.buttonLogin')}
                </Button>
              </View>
              <TouchableOpacity onPress={launchForgotPassword} testID="forgotPasswordLink">
                <CSText style={tw`text-sm text-primary mt-6 self-center`}>
                  {t('login.forgotPassword')}
                </CSText>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* <View style={tw`flex-row justify-center items-center p-5`}>
          <ClearSpendIcon style={tw`w-14`} />
          <View style={tw`flex-1 ml-3`}>
            <CSText style={tw`text-sm text-white`}>
              {t('login.businessSection.copy')}
              <CSText
                style={tw`text-sm text-primary`}
                onPress={() => {
                  Linking.openURL('https://www.clearspend.com/').catch((err) => {
                    // eslint-disable-next-line no-console
                    console.error('Failed to open ClearSpend website: ', err);
                  });
                }}
              >
                {t('login.businessSection.buttonCta')}
              </CSText>
            </CSText>
          </View>
        </View> */}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
