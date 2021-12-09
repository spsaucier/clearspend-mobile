import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import tw from '@/Styles/tailwind';
import { Button, CSText, FocusAwareStatusBar } from '@/Components';
import { CSTextInput } from '@/Components/TextInput';
import { Logo } from '@/Components/Svg/Logo';
import { login } from '@/Services/Auth';

import { Session, updateSession } from '@/Store/Session';
import { ClearSpendIcon } from '@/Components/Svg/ClearSpendIcon';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [authError, setError] = useState<string>();
  const dispatch = useDispatch();

  const handleLogin = () => {
    Keyboard.dismiss();

    setError(undefined);
    setProcessing(true);
    setLoginButtonDisabled(true);

    login(email, password)
      .then((res) => {
        if (res) {
          const sessionPayload = res as Session;
          dispatch(updateSession(sessionPayload));
        }
      })
      .catch((ex) => {
        const {
          data: { error, error_description: errorDescription },
        } = ex;
        const invalidRequest = error === 'invalid_request';
        if (invalidRequest) {
          throw Error(errorDescription);
        }
        const invalidCredentials = error === 'invalid_grant';
        if (invalidCredentials) {
          setError(t('login.invalidCredentials'));
        }
      })
      .finally(() => {
        setProcessing(false);
        setLoginButtonDisabled(false);
      });
  };

  useEffect(() => {
    if (!!email && !!password) {
      setLoginButtonDisabled(!email && !password);
    } else {
      setLoginButtonDisabled(true);
    }
  }, [email, password]);

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`} edges={['top', 'bottom']}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        enableResetScrollToCoords={false}
        contentContainerStyle={tw`flex-1`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`flex-1 p-5 justify-center`}>
          <Logo style={tw`w-30 mb-3`} />
          <CSText
            style={tw.style(
              'text-4xl text-white mb-10 mt-6 font-montreal font-telegraf leading-10',
              { fontWeight: '300' },
            )}
          >
            {t('login.heading')}
          </CSText>

          {/* Work Email */}
          <CSTextInput
            label={t('login.emailLabel')}
            // errorMessage="There was an error"
            placeholder={t('login.emailPlaceholder')}
            keyboardType="email-address"
            containerStyle={tw`mb-8`}
            onChangeText={(value) => setEmail(value)}
            value={email}
          />

          {/* Password */}
          <CSTextInput
            label={t('login.passwordLabel')}
            // errorMessage="There was an error"
            placeholder={t('login.passwordPlaceholder')}
            keyboardType="default"
            containerStyle={tw`mb-4`}
            onChangeText={(value) => setPassword(value)}
            value={password}
            secureTextEntry
          />

          <View style={tw`items-center mb-4`}>
            {authError && <CSText style={tw`text-white `}>{authError}</CSText>}
          </View>

          <Button onPress={handleLogin} disabled={loginButtonDisabled} loading={processing}>
            {t('login.buttonLogin')}
          </Button>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Forgot Password');
            }}
          >
            <CSText style={tw`text-base text-primary mt-6 self-center`}>
              {t('login.forgotPassword')}
            </CSText>
          </TouchableOpacity>
        </View>

        <View style={tw`flex-row justify-center items-center p-5`}>
          <ClearSpendIcon style={tw`w-14`} />
          <View style={tw`flex-1 ml-3`}>
            <CSText style={tw`text-base text-white`}>
              {t('login.businessSection.copy')}
              <CSText style={tw`text-base text-primary`} onPress={() => {}}>
                {t('login.businessSection.buttonCta')}
              </CSText>
            </CSText>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
