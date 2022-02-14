import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
import { Button, CSText, FocusAwareStatusBar } from '@/Components';
import { CSTextField } from '@/Components/TextField';
import { MainScreens } from '../../Navigators/NavigatorTypes';

const ChangePasswordScreen = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const [currPassword, setCurrPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(!currPassword);
  }, [currPassword]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView style={tw`flex-1 p-5 justify-between`} behavior="padding">
        <View>
          <BackButtonNavigator />

          <CSText style={tw`text-2xl text-black pt-8 font-telegraf`}>
            {t('profile.changePassword.currPass')}
          </CSText>
          <CSTextField
            secureTextEntry
            value={currPassword}
            onChangeText={(value) => setCurrPassword(value)}
            autoFocus
          />
        </View>
        <Button
          containerStyle={[tw`mb-5`, buttonDisabled ? tw`bg-gray98` : tw`bg-primary`]}
          label={t('profile.changePassword.next')}
          disabled={buttonDisabled}
          onPress={() => {
            navigate(MainScreens.NewPassword, { currentPassword: currPassword });
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
