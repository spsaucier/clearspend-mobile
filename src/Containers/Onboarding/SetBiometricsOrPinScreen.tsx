/* eslint-disable no-console */
import React from 'react';
import { View, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { useMMKVString } from 'react-native-mmkv';

import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';
import { OnboardingHeader } from '@/Containers/Onboarding/Components/OnboardingHeader';
import { FaceIdIcon } from '@/Components/Icons/faceIdIcon';
import { PinIcon } from '@/Components/Icons/pinIcon';
import { useAuthentication } from '@/Hooks/useAuthentication';
import { MainScreens } from '../../Navigators/NavigatorTypes';
import { AVAILABLE_BIO_KEY } from '../../Store/keys';

const Box: React.FC = ({ children }) => (
  <View style={tw`items-center justify-center h-12 w-12 rounded-lg bg-secondary-light`}>
    {children}
  </View>
);

const SetBiometricsOrPinScreen = () => {
  const { t } = useTranslation();
  const { enableBiometrics, biometricsEnabled } = useAuthentication();
  const { navigate } = useNavigation();
  const [availableBio] = useMMKVString(AVAILABLE_BIO_KEY);

  const onEnableBiometrics = async () => {
    const success = await enableBiometrics();
    if (success) {
      navigate(MainScreens.Wallet);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`}>
      <KeyboardAvoidingView style={tw`flex-1 p-6`} behavior="padding">
        <OnboardingHeader
          hideBackArrow
          title={t('loginOptions.title')}
          subTitle={t('loginOptions.subTitle')}
        />

        {availableBio && !biometricsEnabled && (
          <TouchableOpacity style={tw`flex-row mb-7`} onPress={onEnableBiometrics}>
            <Box>
              <FaceIdIcon size={26} />
            </Box>
            <View style={tw`ml-4 flex-1`}>
              <CSText style={tw`text-white mb-1 mt-1 font-medium`}>
                {t(`loginOptions.${availableBio}.${Platform.OS}.title`)}
              </CSText>
              <CSText style={tw`text-white text-sm`}>
                {t(`loginOptions.${availableBio}.${Platform.OS}.description`)}
              </CSText>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={tw`flex-row mb-7`} onPress={() => console.warn('PIN')}>
          <Box>
            <PinIcon size={34} />
          </Box>
          <View style={tw`ml-4 flex-1`}>
            <CSText style={tw`text-white mb-1 mt-1 font-medium`}>{t('loginOptions.pin')}</CSText>
            <CSText style={tw`text-white text-sm`}>{t('loginOptions.pinDescription')}</CSText>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SetBiometricsOrPinScreen;
