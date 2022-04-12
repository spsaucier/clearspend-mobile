import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, View } from 'react-native';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import tw from '@/Styles/tailwind';
import {
  Button,
  CSText,
  FocusAwareStatusBar,
  CSTextField,
  BackButtonNavigator,
} from '@/Components';
import { PasswordRuleCheck } from './PasswordRuleCheck';
import { useChangePassword } from '@/Queries/authentication';
import { useUser } from '@/Queries';

const NewPasswordScreen = () => {
  const { t } = useTranslation();
  const { popToTop } = useNavigation<StackNavigationProp<ParamListBase>>();
  const [newPassword, setNewPassword] = useState('');
  const {
    params: { currentPassword },
  } = useRoute<any>();

  const { mutate, error, isLoading, isSuccess } = useChangePassword();
  const { data: user } = useUser();

  const onUpdatePassword = () => {
    mutate({
      username: user?.email,
      currentPassword,
      newPassword,
    });
  };

  const onUpdatePasswordSuccess = useCallback(() => {
    Toast.show({
      type: 'success',
      text1: t('toasts.updatePasswordSuccess'),
    });
    popToTop();
  }, [t, popToTop]);

  useEffect(() => {
    if (error) {
      const { data: errorData, status } = error.response;

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
    }
  }, [t, error]);

  useEffect(() => {
    if (isSuccess) {
      onUpdatePasswordSuccess();
    }
  }, [isSuccess, onUpdatePasswordSuccess]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView style={tw`flex-1 p-5 justify-between`} behavior="padding">
        <View>
          <BackButtonNavigator />
          <CSText style={tw`text-2xl text-black pt-16 font-telegraf`}>
            {t('profile.newPassword.title')}
          </CSText>
          <CSTextField
            secureTextEntry
            value={newPassword}
            onChangeText={(value) => setNewPassword(value)}
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
          containerStyle={[tw`mb-5`, newPassword.length < 10 ? tw`bg-black-5` : tw`bg-primary`]}
          disabled={isLoading || !(newPassword.length >= 10 && newPassword.length <= 30)}
          loading={isLoading}
          label={t('profile.changePassword.title')}
          onPress={onUpdatePassword}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewPasswordScreen;
