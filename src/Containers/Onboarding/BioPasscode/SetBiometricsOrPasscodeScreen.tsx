import React from 'react';
import { View, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { useMMKVString } from 'react-native-mmkv';
import Toast from 'react-native-toast-message';

import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';
import { OnboardingHeader } from '@/Containers/Onboarding/Components/OnboardingHeader';
import { FaceIdIcon, PinIcon, TouchIdIcon } from '@/Components/Icons';
import { useAuthentication } from '@/Hooks/useAuthentication';
import { AVAILABLE_BIO_KEY } from '@/Store/keys';
import { BioPasscodeScreens, BioPasscodeNavigationProp } from './BioPasscodeTypes';
import { AuthenticationMethods } from '@/Hooks/useAvailableBioMethod';
import { MainScreens } from '@/Navigators/NavigatorTypes';

export const RoundedBox: React.FC = ({ children }) => (
  <View style={tw`items-center justify-center h-12 w-12 rounded-lg bg-secondary-light`}>
    {children}
  </View>
);

const SetBiometricsOrPasscodeScreen = () => {
  const { t } = useTranslation();
  const { enableBiometrics, biometricsEnabled, loggedIn, setLoggedIn } = useAuthentication();
  const { navigate, replace } = useNavigation<BioPasscodeNavigationProp>();
  const [availableBio] = useMMKVString(AVAILABLE_BIO_KEY);

  const onEnableBiometrics = async () => {
    const success = await enableBiometrics();
    if (success) {
      if (!loggedIn) {
        setLoggedIn(true);
      }
      Toast.show({
        type: 'success',
        text1: t('profile.updateAuth.success', { method: availableBio }),
      });
      replace(MainScreens.Home);
    }
  };

  const onPressPasscode = () => {
    navigate(BioPasscodeScreens.Set);
  };

  const subTitleFaceOrBio = t(`loginOptions.${availableBio}.${Platform.OS}.title`);
  const subTitle = t('loginOptions.subTitle', {
    faceOrBio:
      availableBio !== ''
        ? t(`loginOptions.subTitleFaceOrBio`, {
            type: Platform.OS === 'ios' ? subTitleFaceOrBio : subTitleFaceOrBio.toLowerCase(),
          })
        : null,
  });

  return (
    <KeyboardAvoidingView style={tw`flex-1 pt-20`} behavior="padding">
      <OnboardingHeader hideBackArrow title={t('loginOptions.title')} subTitle={subTitle} />

      {availableBio && !biometricsEnabled ? (
        <TouchableOpacity style={tw`flex-row mb-7`} onPress={onEnableBiometrics}>
          <RoundedBox>
            {availableBio === AuthenticationMethods.FACE ? (
              <FaceIdIcon size={26} />
            ) : (
              <TouchIdIcon size={26} />
            )}
          </RoundedBox>
          <View style={tw`ml-4 flex-1`}>
            <CSText style={tw`text-white mb-1 mt-1 font-medium`}>
              {t(`loginOptions.${availableBio}.${Platform.OS}.title`)}
            </CSText>
            <CSText style={tw`text-white text-sm`}>
              {t(`loginOptions.${availableBio}.${Platform.OS}.description`)}
            </CSText>
          </View>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity style={tw`flex-row mb-7`} onPress={onPressPasscode}>
        <RoundedBox>
          <PinIcon size={34} />
        </RoundedBox>
        <View style={tw`ml-4 flex-1`}>
          <CSText style={tw`text-white mb-1 mt-1 font-medium`}>{t('loginOptions.pin')}</CSText>
          <CSText style={tw`text-white text-sm`}>{t('loginOptions.pinDescription')}</CSText>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SetBiometricsOrPasscodeScreen;
