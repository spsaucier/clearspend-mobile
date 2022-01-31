import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/core';
import tw from '@/Styles/tailwind';
import { Button } from '@/Components';
import { PasswordRuleRow } from '@/Containers/Onboarding/Components/PasswordRuleRow';
import { AuthScreens } from '@/Navigators/NavigatorTypes';
import { changePassword, login } from '@/Services/Auth';
import { OnboardingTextInput } from '@/Components/OnboardingTextInput';
import { OnboardingScreenTitle } from './Components/OnboardingScreenTitle';
import { Session } from '@/Store/Session';

const SetPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const [pwdError, setPwdError] = useState(false);
  const route = useRoute<any>();
  const { params } = route;
  const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{10,30}$');

  const { changePassId } = params;
  const { email } = params;

  const changePass = () => {
    changePassword(changePassId, password)
      .then((res) => {
        if (res.status === 200) {
          login(email, password).then((response) => {
            if ('accessToken' in response) {
              const sessionPayload = response as Session;
              navigate(AuthScreens.EnterMobile, { sessionPayload });
            }
          });
        }
      })
      .catch((ex) => {
        const {
          data: { error, error_description: errorDescription },
        } = ex;
        const invalidRequest = error === 'invalid_request';
        if (invalidRequest) {
          throw Error(errorDescription);
        } else {
          Promise.reject(new Error('Change Password id not found'));
        }
      });
  };

  useEffect(() => {
    setButtonDisabled(!validPassword.test(password));
  }, [password]);

  const validatePassword = () => {
    if (password.length > 10 && !validPassword.test(password)) {
      setPwdError(true);
    } else if (password.length === 1 || validPassword.test(password)) {
      setPwdError(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary p-6`}>
      <KeyboardAvoidingView style={tw`flex-1 pb-5 justify-between`} behavior="padding">
        <OnboardingScreenTitle
          titlePart1={t('setPassword.titlePart1')}
          titlePart2={t('setPassword.titlePart2')}
          titlePart3=""
        />
        {pwdError && (
          <Text style={tw`text-white`}>
            That password cannot be used. Please enter a different password.
          </Text>
        )}
        <OnboardingTextInput
          keyboardType="default"
          containerStyle={tw`mb-8`}
          secureTextEntry
          value={password}
          onChangeText={(value) => setPassword(value)}
          autoFocus
          onChange={validatePassword}
        />
        <View>
          <PasswordRuleRow
            label={t('setPassword.rules.length')}
            enteredPassword={password.length >= 10}
          />
        </View>

        <Button
          containerStyle={[
            tw`mt-auto mb-4`,
            !validPassword.test(password) ? tw`bg-gray98` : tw`bg-primary`,
          ]}
          onPress={changePass}
          disabled={buttonDisabled}
        >
          {t('setPassword.buttonCta')}
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SetPasswordScreen;
