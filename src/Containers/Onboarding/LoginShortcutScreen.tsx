import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/core';
import tw from '@/Styles/tailwind';
import { CSText, FocusAwareStatusBar } from '@/Components';
import { Logo } from '@/Components/Svg/Logo';

import { MainScreens } from '@/Navigators/NavigatorTypes';
import { useAuthentication } from '@/Hooks/useAuthentication';
import useBiometricLogin from '@/Hooks/useBiometricLogin';

const LoginShortcutScreen = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const { setLoggedIn, logout } = useAuthentication();

  useBiometricLogin(() => {
    setLoggedIn(true);
    navigate(MainScreens.Home);
  }, () => {
    logout();
  });

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`} edges={['top', 'bottom']}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        enableResetScrollToCoords={false}
        style={tw`flex-1`}
        contentContainerStyle={tw`flex-1 justify-between`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`p-5 justify-center`}>
          <Logo style={tw`w-30 mb-3`} />
        </View>

        <View style={tw`flex-row justify-center items-center p-5 mb-5`}>
          <View style={tw`flex-1 ml-3`}>
            <CSText style={tw`text-base text-white text-center`}>
              {t('login.shortcut.havingTroubleLoggingIn')}
            </CSText>
            <CSText
              style={tw`text-base text-primary text-center`}
              onPress={() => {
                logout();
              }}
            >
              {t('login.shortcut.loginWithEmailPassword')}
            </CSText>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginShortcutScreen;
