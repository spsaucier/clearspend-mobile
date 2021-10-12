import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import tw from '@/Styles/tailwind';
import { Button, FocusAwareStatusBar } from '@/Components';
import { TWTextInput } from '@/Components/TextInput';

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
    <SafeAreaView style={tw`flex-1 bg-primary`} edges={['top']}>
      <FocusAwareStatusBar backgroundColor={tw.color('primary')} barStyle="light-content" />
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        enableResetScrollToCoords={false}
        contentContainerStyle={tw`flex-1`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`flex-1 p-5 justify-center`}>
          <Text style={tw`text-3xl text-white mb-6 font-semibold`}>{t('login.heading')}</Text>

          {/* Work Email */}
          <TWTextInput
            label={t('login.emailLabel')}
            errorMessage="There was an error"
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
            <Text style={tw`text-sm text-copyLight mt-6 self-center font-semibold`}>
              {t('login.forgotPassword')}
            </Text>
          </TouchableOpacity>
        </View>

        <SafeAreaView
          style={tw`justify-center items-center bg-primary-light rounded-t-3xl p-5`}
          edges={['bottom']}
        >
          <View
            style={tw.style('flex self-center bg-white opacity-30 w-14 rounded-full mb-5', {
              height: 6,
            })}
          />
          <Text style={tw`text-sm text-copyLight mb-5`}>{t('login.businessSection.copy')}</Text>
          <Button containerStyle={tw`bg-primary-light-light`} textStyle={tw`text-copyLight`}>
            {t('login.businessSection.buttonCta')}
          </Button>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
