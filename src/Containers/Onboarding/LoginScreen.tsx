import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import tw from '@/Styles/tailwind';
import { Button, FocusAwareStatusBar } from '@/Components';
import { TWTextInput } from '@/Components/TextInput';
import { Logo } from '@/Components/Svg/Logo';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);

  const handleLogin = () => {
    Keyboard.dismiss();
    // If not signed up
    navigation.navigate('Select Organization');
  };

  useEffect(() => {
    if (!!email && !!password) {
      setLoginButtonDisabled(false);
    } else {
      setLoginButtonDisabled(true);
    }
  }, [email, password]);

  return (
    <SafeAreaView style={tw`flex-1 bg-forest-green`} edges={['top']}>
      <FocusAwareStatusBar backgroundColor={tw.color('primary')} barStyle="light-content" />
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
            containerStyle={tw`mb-8`}
            onChangeText={(value) => setPassword(value)}
            value={password}
            secureTextEntry
          />

          <Button textStyle={tw`font-bold`} onPress={handleLogin} disabled={loginButtonDisabled}>
            {t('login.buttonCta')}
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
