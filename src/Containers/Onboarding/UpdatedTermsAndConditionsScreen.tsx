import React from 'react';
import { Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trans, useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import tw from '@/Styles/tailwind';
import { Logo } from '@/Components/Svg/Logo';
import { Button, CSText, FocusAwareStatusBar } from '@/Components';

import { ArrowSquareOutIcon } from '@/Components/Icons';
import { Constants } from '@/consts';
import { useAuthentication } from '@/Hooks/useAuthentication';
import { useAcceptTermsAndConditions } from '@/Queries/termsAndConditions';
import { MainScreens, MainStackParamTypes } from '@/Navigators/NavigatorTypes';

const UpdatedTermsAndConditionsScreen = () => {
  const { t } = useTranslation();
  const { logout } = useAuthentication();
  const { replace } = useNavigation<NativeStackNavigationProp<MainStackParamTypes, MainScreens>>();
  const { mutateAsync: acceptTermsAndConditionsMutation, isLoading } =
    useAcceptTermsAndConditions();

  const launchURL = (url: string) =>
    Linking.canOpenURL(url).then((canOpen) => {
      if (canOpen) Linking.openURL(url);
    });

  const cancelAndLogout = () => logout();

  const onAcceptTermsAndConditionsPress = () => {
    acceptTermsAndConditionsMutation()
      .then(() => replace(MainScreens.Home))
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: t('termsAndPrivacyPolicyUpdated.error'),
        });
      });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary p-6`}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView style={tw`flex-1`} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={tw`flex-1 bg-secondary`}>
          <Logo style={tw`w-30 mt-6`} />
          <CSText style={tw`text-3xl text-white mt-10`}>
            <Trans
              i18nKey={t('termsAndPrivacyPolicyUpdated.title')}
              components={{
                key1: <CSText style={tw`text-3xl text-primary`} />,
              }}
            />
          </CSText>
          <CSText style={tw`text-white my-6`}>{t('termsAndPrivacyPolicyUpdated.subTitle')}</CSText>

          <TouchableOpacity
            style={tw`flex-row justify-between px-4 py-2 bg-secondary-light items-center rounded my-4`}
            testID="termsAndPrivacyLink"
            onPress={() => launchURL(Constants.TERMS_CONDITIONS_URL)}
          >
            <CSText style={tw`text-primary`}>
              {t('termsAndPrivacyPolicyUpdated.termsOfService')}
            </CSText>
            <ArrowSquareOutIcon />
          </TouchableOpacity>

          <TouchableOpacity
            testID="privacyPolicyLink"
            style={tw`flex-row justify-between px-4 py-2 bg-secondary-light items-center rounded`}
            onPress={() => launchURL(Constants.PRIVACY_POLICY_URL)}
          >
            <CSText style={tw`text-primary`}>
              {t('termsAndPrivacyPolicyUpdated.privacyPolicy')}
            </CSText>
            <ArrowSquareOutIcon />
          </TouchableOpacity>
        </View>

        <View style={tw`mt-4`}>
          <Button
            small
            onPress={onAcceptTermsAndConditionsPress}
            loading={isLoading}
            testID="acceptAndContinueButton"
          >
            {t('termsAndPrivacyPolicyUpdated.acceptAndContinue')}
          </Button>

          <TouchableOpacity onPress={cancelAndLogout} testID="cancelButton">
            <CSText style={tw`text-sm text-primary mt-4 self-center`}>
              {t('termsAndPrivacyPolicyUpdated.cancelAndLogout')}
            </CSText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdatedTermsAndConditionsScreen;
