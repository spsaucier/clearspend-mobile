import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import tw from '@/Styles/tailwind';
import {
  Button,
  CSText,
  FocusAwareStatusBar,
  BackButtonNavigator,
  CSTextInput,
} from '@/Components';
import { PasswordRuleCheck } from './PasswordRuleCheck';
import { useChangePassword } from '@/Queries/authentication';
import { OTPView } from '@/Containers/Onboarding/OTPView';
import { MainScreens, MainStackParamTypes } from '@/Navigators/NavigatorTypes';
import { formatPhone } from '@/Helpers/StringHelpers';
import { useUser } from '@/Queries';

type NewPasswordScreenNavigationProps = NativeStackScreenProps<
  MainStackParamTypes,
  MainScreens.NewPassword
>;

type NewPasswordScreenRouteProp = NewPasswordScreenNavigationProps['route'];

const NewPasswordScreen = () => {
  const { t } = useTranslation();
  const { popToTop, pop } = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {
    params: { currentPassword },
  } = useRoute<NewPasswordScreenRouteProp>();

  const { mutateAsync, isLoading } = useChangePassword();
  const { data: user } = useUser();

  const [newPassword, setNewPassword] = useState('');
  const [showOtpEntry, setShowOtpEntry] = useState(false);
  const [otpError, setOtpError] = useState<boolean>(false);
  const [twoFactorId, setTwoFactorId] = useState('');
  const [trustChallenge, setTrustChallenge] = useState('');

  const handleSuccessResponse = useCallback(() => {
    Toast.show({
      type: 'success',
      text1: t('toasts.updatePasswordSuccess'),
    });
    popToTop();
  }, [popToTop, t]);

  const handleErrorResponse = useCallback(
    (err) => {
      if (err) {
        const { data: errorData, status } = err.response;

        let returnMessage;
        if (status === 404) {
          returnMessage = t('setPassword.incorrectCurrentPasswordError');
        } else if (status === 400) {
          if (errorData.fieldErrors?.password) {
            const [firstError] = errorData.fieldErrors?.password;
            const { code } = firstError;
            if (code === '[previouslyUsed]password') {
              returnMessage = t('setPassword.samePasswordError');
            }
          }
        }

        if (!returnMessage) {
          returnMessage = t('setPassword.genericPasswordError');
        }

        Toast.show({
          type: 'error',
          text1: returnMessage,
        });

        if (showOtpEntry) {
          setShowOtpEntry(false);
        } else {
          pop();
        }
      }
    },
    [pop, showOtpEntry, t],
  );

  const onUpdatePassword = () => {
    mutateAsync({
      currentPassword,
      newPassword,
    })
      .then((response) => {
        // If the user needs to verify 2FA display the OTP entry UI
        if (response.status === 242 && response.data.twoFactorId && response.data.trustChallenge) {
          setTwoFactorId(response.data.twoFactorId);
          setTrustChallenge(response.data.trustChallenge);
          setShowOtpEntry(true);
        } else {
          handleSuccessResponse();
        }
      })
      .catch(handleErrorResponse);
  };

  const on2FAEntered = (twoFactorCode: string) => {
    // Resubmit 2FA with the code entered by the user, and the trustChallenge and twoFactorId values from the backend
    mutateAsync({ currentPassword, newPassword, twoFactorCode, trustChallenge, twoFactorId })
      .then(handleSuccessResponse)
      .catch((e) => {
        // Handle incorrect OTP code
        if (e?.response?.status === 421) {
          setOtpError(true);
        } else {
          handleErrorResponse(e);
        }
      });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView style={tw`flex-1 p-5 justify-between`} behavior="padding">
        {showOtpEntry ? (
          <View style={tw`flex-1`}>
            <BackButtonNavigator onBackPress={() => setShowOtpEntry(false)} />
            <View style={tw`mb-5 h-1/2`}>
              <OTPView
                title={
                  <CSText
                    testID="updatePassword-enterOTP-title"
                    style={tw`font-telegraf text-2xl mb-3 mt-6 leading-7`}
                  >
                    {t('otp.title')}
                  </CSText>
                }
                theme="light"
                testID="updatePassword-enterOTP-input"
                error={otpError}
                errorTitle={t('otp.incorrect')}
                errorTextStyle={tw`text-black`}
                onPasscodeChanged={() => setOtpError(false)}
                onSuccessFinished={on2FAEntered}
              />
              <View style={tw`flex-row justify-center px-3`} />

              <TouchableOpacity
                style={tw`mt-auto mt-10`}
                testID="updatePassword-resendOTP-button"
                accessibilityRole="button"
                onPress={() => {
                  Toast.show({
                    type: 'success',
                    text1: t('toasts.verificationResent', { number: formatPhone(user?.phone) }),
                  });
                  onUpdatePassword();
                }}
              >
                <View style={tw`items-center my-6`}>
                  <CSText style={tw`text-sm mb-6`}>{t('otp.resendCode')}</CSText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <View>
              <BackButtonNavigator />
              <CSText style={tw`text-2xl text-black pt-8 font-telegraf`}>
                {t('profile.newPassword.title')}
              </CSText>
              <CSTextInput
                testID="updatePassword-newPasswordEntryField"
                value={newPassword}
                onChangeText={(value) => setNewPassword(value)}
                onSubmitEditing={onUpdatePassword}
                theme="light"
                secureTextEntry
                autoFocus
              />
              <View style={tw`mt-8`}>
                <PasswordRuleCheck
                  label={t('profile.newPassword.rules.minLength')}
                  enteredPassword={newPassword.length >= 10}
                />
                <PasswordRuleCheck
                  label={t('profile.newPassword.rules.maxLength')}
                  enteredPassword={newPassword.length <= 30}
                />
              </View>
            </View>
            <Button
              testID="updatePassword-changePassword-button"
              containerStyle={[tw`mb-5`, newPassword.length < 10 ? tw`bg-black-5` : tw`bg-primary`]}
              disabled={isLoading || !(newPassword.length >= 10 && newPassword.length <= 30)}
              loading={isLoading}
              label={t('profile.changePassword.title')}
              onPress={onUpdatePassword}
            />
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewPasswordScreen;
