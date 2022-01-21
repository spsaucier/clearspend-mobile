/* eslint-disable no-console */
import React from 'react';
import { View, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';
import { OnboardingHeader } from '@/Containers/Onboarding/Components/OnboardingHeader';
import { FaceIdIcon } from '@/Components/Icons/faceIdIcon';
import { PinIcon } from '@/Components/Icons/pinIcon';
import { useAuthentication } from '@/Hooks/useAuthentication';
import { MainScreens } from '../../Navigators/NavigatorTypes';
import { useAvailableBioMethod } from '@/Hooks/useAvailableBioMethod';

const Box: React.FC = ({ children }) => (
  <View style={tw`items-center justify-center h-12 w-12 rounded-lg bg-secondary-light`}>
    {children}
  </View>
);

const SetBiometricsOrPinScreen = () => {
  const { t } = useTranslation();
  const { methodAvailable: bioMethodAvailable } = useAvailableBioMethod();
  const { enableBiometrics } = useAuthentication();
  const { navigate } = useNavigation();

  const onEnableBiometrics = async () => {
    await enableBiometrics(true);
    navigate(MainScreens.Wallet);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`}>
      <KeyboardAvoidingView style={tw`flex-1 p-6`} behavior="padding">
        <OnboardingHeader
          hideBackArrow
          title={t('loginOptions.title')}
          subTitle={t('loginOptions.subTitle')}
        />

        {bioMethodAvailable && (
          <TouchableOpacity style={tw`flex-row mb-7`} onPress={onEnableBiometrics}>
            <Box>
              <FaceIdIcon size={26} />
            </Box>
            <View style={tw`ml-4 flex-1`}>
              <CSText style={tw`text-white mb-1 mt-1 font-medium`}>
                {t(`loginOptions.${bioMethodAvailable}.${Platform.OS}.title`)}
              </CSText>
              <CSText style={tw`text-white text-sm`}>
                {t(`loginOptions.${bioMethodAvailable}.${Platform.OS}.description`)}
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
