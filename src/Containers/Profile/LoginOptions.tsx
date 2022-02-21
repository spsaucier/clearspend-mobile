import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMMKVString } from 'react-native-mmkv';
import Toast from 'react-native-toast-message';
import tw from '@/Styles/tailwind';
import { ProfileSettingsHeader } from '@/Containers/Profile/Components/ProfileSettingHeader';
import { FocusAwareStatusBar } from '@/Components';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { ProfileMenuRow } from './Components/ProfileMenuRow';
import { KeyIconLg } from '@/Components/Icons';
import { useAuthentication } from '@/Hooks/useAuthentication';
import { AVAILABLE_BIO_KEY } from '@/Store/keys';
import { navigationRef } from '@/Navigators/Root';

const LoginOptionsScreen = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const { biometricsEnabled, disableBiometrics, passcodeEnabled, disablePasscode } =
    useAuthentication();
  const [availableBio] = useMMKVString(AVAILABLE_BIO_KEY);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView style={tw`flex-1 p-5 justify-between`} behavior="padding">
        <View>
          <ProfileSettingsHeader
            icon={<KeyIconLg size={32} />}
            title={t('profile.loginOptions.title')}
          />
          <View style={tw`mt-5`}>
            <View style={tw`mb-3`}>
              <ProfileMenuRow
                title={
                  !availableBio
                    ? t('profile.loginOptions.pin')
                    : `${t('profile.loginOptions.pinOr', { method: availableBio })}`
                }
                onPress={async () => {
                  if (biometricsEnabled) {
                    await disableBiometrics();
                    Toast.show({
                      type: 'success',
                      text1: t('profile.updateAuth.disabled', { method: availableBio }),
                    });
                  }
                  if (passcodeEnabled) {
                    // We do not prompt for PIN again, as the user can log out to remove PIN anyway
                    await disablePasscode();
                    Toast.show({
                      type: 'success',
                      text1: t('profile.updateAuth.disabled', { method: 'PIN' }),
                    });
                  }
                  navigationRef.current?.navigate(MainScreens.SetBiometricsOrPasscode);
                }}
              />
            </View>
            <View style={tw`mb-3`}>
              <ProfileMenuRow
                title={t('profile.loginOptions.updatePassword')}
                onPress={() => {
                  navigate(MainScreens.ChangePassword);
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginOptionsScreen;
