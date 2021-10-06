import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';
import { Button, FocusAwareStatusBar } from '@/Components';
import { TWTextInput } from '@/Components/TextInput';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();

  const handleLogin = () => {
    // If not signed up
    navigation.navigate('Select Organization');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-primary`} edges={['top']}>
      <FocusAwareStatusBar backgroundColor={tw.color('primary')} barStyle="light-content" />

      <View style={tw`flex-1`}>
        <View style={tw`flex-1 p-5 justify-center`}>
          <Text style={tw`text-3xl text-white mb-6 font-semibold`}>{t('login.heading')}</Text>

          {/* Work Email */}
          <TWTextInput
            label={t('login.emailLabel')}
            // errorMessage="There was an error"
            placeholder={t('login.emailPlaceholder')}
            keyboardType="email-address"
            containerStyle={tw`mb-8`}
          />

          {/* Password */}
          <TWTextInput
            label={t('login.passwordLabel')}
            // errorMessage="There was an error"
            placeholder={t('login.passwordPlaceholder')}
            keyboardType="default"
            containerStyle={tw`mb-8`}
          />

          <Button
            containerStyle={tw`flex w-full h-16`}
            textStyle={tw`text-primaryLight font-bold`}
            onPress={handleLogin}
          >
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
          style={tw`justify-center items-center bg-primaryLight rounded-t-3xl p-5`}
          edges={['bottom']}
        >
          <View
            style={tw.style('flex self-center bg-white opacity-30 w-14 rounded-full mb-5', {
              height: 6,
            })}
          />
          <Text style={tw`text-sm text-copyLight mb-5`}>{t('login.businessSection.copy')}</Text>
          <Button
            containerStyle={tw`flex w-full h-16 bg-primaryLightLight`}
            textStyle={tw`text-copyLight`}
          >
            {t('login.businessSection.buttonCta')}
          </Button>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
