import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { ProfileSettingsHeader } from '@/Containers/Profile/Components/ProfileSettingHeader';
import { Button, CSText, FocusAwareStatusBar } from '@/Components';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
import { CSTextField } from '@/Components/TextField';
import { PasswordRuleCheck } from './PasswordRuleCheck';

const NewPasswordScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [newPassword, setNewPassword] = useState('');

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView style={tw`flex-1 p-5 justify-between`} behavior="padding">
        <View>
          <View style={tw`flex-row`}>
            <BackButtonNavigator backNav={t('profile.backNav')} />
            <ProfileSettingsHeader title={t('profile.changePassword.title')} />
          </View>
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
          containerStyle={[tw`mb-5`, newPassword.length < 10 ? tw`bg-gray98` : tw`bg-primary`]}
          disabled={!(newPassword.length >= 10 && newPassword.length <= 30)}
          label={t('profile.changePassword.title')}
          onPress={() => {
            navigation.navigate('Change Password Message');
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewPasswordScreen;
