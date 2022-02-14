import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import tw from '@/Styles/tailwind';
import { Button, CSText } from '@/Components';
import { PasswordRuleRow } from '@/Containers/Onboarding/Components/PasswordRuleRow';
import { changePassword, login } from '@/Services/Auth';
import { OnboardingTextInput } from '@/Components/OnboardingTextInput';
import { OnboardingScreenTitle } from './Components/OnboardingScreenTitle';
import { Session, updateSession } from '@/Store/Session';
import { mixpanel } from '@/Services/utils/analytics';

const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{10,30}$');

const SetPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { t } = useTranslation();
  const [pwdError, setPwdError] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const route = useRoute<any>();
  const { params } = route;
  const dispatch = useDispatch();

  const { changePasswordId } = params;
  const { email, password: currentPassword } = params;

  const changePass = () => {
    changePassword(changePasswordId, password, currentPassword)
      .then((res) => {
        if (res.status === 200) {
          login(email, password).then((response) => {
            if ('accessToken' in response) {
              mixpanel.track('Login');
              const sessionPayload = response as Session;
              dispatch(updateSession(sessionPayload));
            }
          });
        } else {
          // eslint-disable-next-line no-console
          console.log(res);
        }
      })
      .catch((ex) => {
        // eslint-disable-next-line no-console
        console.log('Field errors: ', JSON.stringify(ex.fieldErrors));
        if (ex?.fieldErrors?.password?.[0]?.code === '[previouslyUsed]password') {
          setSubmissionError(t('setPassword.samePasswordError'));
        } else {
          setSubmissionError(ex.message);
        }
      });
  };

  useEffect(() => {
    setButtonDisabled(!validPassword.test(password));
  }, [password]);

  const validatePassword = () => {
    setSubmissionError('');
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
        />
        <OnboardingTextInput
          keyboardType="default"
          containerStyle={tw`mb-8`}
          secureTextEntry
          value={password}
          onChangeText={(value) => {
            setPassword(value);
          }}
          autoFocus
          onChange={validatePassword}
        />
        {pwdError && (
          <CSText style={tw`text-white mb-5`}>
            That password cannot be used. Please enter a different password.
          </CSText>
        )}
        {submissionError ? <CSText style={tw`text-white mb-5`}>{submissionError}</CSText> : null}
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
