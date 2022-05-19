import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
import { Button, CSText, CSTextInput, FocusAwareStatusBar } from '@/Components';
import { MainScreens } from '@/Navigators/NavigatorTypes';

const ChangePasswordScreen = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const [currPassword, setCurrPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(!currPassword);
  }, [currPassword]);

  const navigateToNewPassword = () => {
    navigate(MainScreens.NewPassword, { currentPassword: currPassword });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView style={tw`flex-1 p-5 justify-between`} behavior="padding">
        <View>
          <BackButtonNavigator />

          <CSText style={tw`text-2xl text-black pt-8 font-telegraf`}>
            {t('profile.changePassword.currPass')}
          </CSText>
          <CSTextInput
            theme="light"
            value={currPassword}
            onChangeText={(value) => setCurrPassword(value)}
            onSubmitEditing={navigateToNewPassword}
            secureTextEntry
            autoFocus
          />
        </View>
        <Button
          containerStyle={[tw`mb-5`, buttonDisabled ? tw`bg-gray-5` : tw`bg-primary`]}
          label={t('profile.changePassword.next')}
          disabled={buttonDisabled}
          onPress={navigateToNewPassword}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
