import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import tw from '@/Styles/tailwind';
import { Button, FocusAwareStatusBar } from '@/Components';
import { TWTextInput } from '@/Components/TextInput';
import { Logo } from '@/Components/Svg/Logo';
import { login } from '@/Services/Auth';

import { Session, updateSession } from '@/Store/Session';

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
    <SafeAreaView style={tw`flex-1 bg-forest-green`} edges={['top']}>
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
          <Text style={tw`text-3xl text-white mb-10 mt-6`}>{t('login.heading')}</Text>

          {/* Work Email */}
          <TWTextInput
            label={t('login.emailLabel')}
            // errorMessage="There was an error"
            placeholder={t('login.emailPlaceholder')}
            keyboardType="email-address"
            containerStyle={tw`mb-8`}
            onChangeText={(value) => setEmail(value)}
            value={email}
          />

          {/* Password */}
          <TWTextInput
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
            {authError && <Text style={tw`text-white `}>{authError}</Text>}
          </View>

          <Button
            textStyle={tw`font-bold`}
            onPress={handleLogin}
            disabled={loginButtonDisabled}
            loading={processing}
          >
            {t('login.buttonLogin')}
          </Button>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Forgot Password');
            }}
          >
            <Text style={tw`text-sm text-white mt-6 self-center font-semibold`}>
              {t('login.forgotPassword')}
            </Text>
          </TouchableOpacity>
        </View>

        <SafeAreaView
          style={tw`justify-center items-center bg-card-dark rounded-t-3xl p-5 pb-3`}
          edges={['bottom']}
        >
          <View
            style={tw.style('flex self-center bg-white opacity-30 w-14 rounded-full mb-5', {
              height: 6,
            })}
          />
          <Text style={tw`text-sm text-white mb-5`}>
            {t('login.businessSection.copy')}
            <Text style={tw`text-sm text-primary-new mb-5`} onPress={() => {}}>
              {' '}
              {t('login.businessSection.buttonCta')}
            </Text>
          </Text>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
