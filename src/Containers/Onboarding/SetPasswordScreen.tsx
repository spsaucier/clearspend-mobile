import React, { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Linking, View } from 'react-native';
import { Trans, useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { inRange } from 'lodash';

import tw from '@/Styles/tailwind';
import { Button, CSText } from '@/Components';
import { PasswordRuleRow } from '@/Containers/Onboarding/Components/PasswordRuleRow';
import { changePassword, login } from '@/Services/Auth';
import { OnboardingTextInput } from '@/Components/OnboardingTextInput';
import { OnboardingScreenTitle } from './Components/OnboardingScreenTitle';
import { Session, updateSession } from '@/Store/Session';
import { mixpanel } from '@/Services/utils/analytics';
import { CheckBoxInput } from '@/Components/CheckBoxInput';
import { Constants } from '@/consts';

const SetPasswordScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute<any>();
  const { params } = route;
  const { t } = useTranslation();

  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [submissionError, setSubmissionError] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [conditionsAccepted, setConditionsAccepted] = useState(false);

  const { changePasswordId } = params;
  const { email, password: currentPassword } = params;

  const changePass = () => {
    setSubmitting(true);
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
          // TODO: handle other cases
        }
      })
      .catch((ex) => {
        if (ex?.fieldErrors?.password?.[0]?.code === '[previouslyUsed]password') {
          setSubmissionError(t('setPassword.samePasswordError'));
        } else if (ex?.generalErrors?.[0]?.message) {
          setSubmissionError(ex?.generalErrors?.[0]?.message);
        } else {
          setSubmissionError(t('setPassword.genericPasswordError'));
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const passwordValid = useCallback(() => inRange(password.length, 10, 31), [password.length]);

  useEffect(() => {
    setButtonDisabled(!passwordValid || !conditionsAccepted);
  }, [password, conditionsAccepted, passwordValid]);

  const launchURL = (url: string) =>
    Linking.canOpenURL(url).then((canOpen) => {
      if (canOpen) Linking.openURL(url);
    });

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary p-6`}>
      <KeyboardAvoidingView style={tw`flex-1 pb-5 justify-between`} behavior="padding">
        <View>
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
              setSubmissionError(undefined);
            }}
            autoFocus
          />
          {submissionError ? (
            <CSText testID="submissionErrorText" style={tw`text-white mb-5`}>
              {submissionError}
            </CSText>
          ) : null}
          <View>
            <PasswordRuleRow label={t('setPassword.rules.length')} matchingRule={passwordValid()} />
          </View>
        </View>

        <View style={tw``}>
          <View style={tw`flex-row mb-6`}>
            <CheckBoxInput onToggle={setConditionsAccepted} />
            <CSText style={tw`mx-3 text-base text-white`}>
              <Trans
                i18nKey={t('setPassword.termsAndPrivacyAcceptance')}
                components={{
                  key1: (
                    <CSText
                      style={tw`text-primary underline`}
                      onPress={() => launchURL(Constants.TERMS_CONDITIONS_URL)}
                    />
                  ),
                  key2: (
                    <CSText
                      style={tw`text-primary underline`}
                      onPress={() => launchURL(Constants.PRIVACY_POLICY_URL)}
                    />
                  ),
                }}
              />
            </CSText>
          </View>

          <Button
            containerStyle={[tw`mt-auto mb-4`, buttonDisabled ? tw`bg-gray-5` : tw`bg-primary`]}
            onPress={changePass}
            loading={submitting}
            disabled={buttonDisabled}
          >
            {t('setPassword.buttonCta')}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SetPasswordScreen;
