import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from '@/Styles/tailwind';
import { Button, CSText, FocusAwareStatusBar } from '@/Components';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
import { CSTextField } from '@/Components/TextField';
import { PasswordRuleCheck } from './PasswordRuleCheck';

const NewPasswordScreen = () => {
  const { t } = useTranslation();
  const { popToTop } = useNavigation<StackNavigationProp<ParamListBase>>();
  const [newPassword, setNewPassword] = useState('');

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
              label={t('profile.rules.minLength')}
              enteredPassword={newPassword.length >= 10}
            />
            <PasswordRuleCheck
              label={t('profile.rules.maxLength')}
              enteredPassword={newPassword.length <= 30}
            />
          </View>
        </View>
        <Button
          containerStyle={[tw`mb-5`, newPassword.length < 10 ? tw`bg-gray-5` : tw`bg-primary`]}
          disabled={!(newPassword.length >= 10 && newPassword.length <= 30)}
          label={t('profile.changePassword.title')}
          onPress={() => {
            try {
              // TODO: await update password when API is available from Capital
              Toast.show({
                type: 'success',
                text1: t('toasts.updatePasswordSuccess'),
              });
              popToTop();
            } catch {
              Toast.show({
                type: 'error',
                text1: t('toasts.updatePasswordFailed'),
              });
            }
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewPasswordScreen;
