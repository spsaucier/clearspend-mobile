import React, { useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import PhoneInput from 'react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import tw from '@/Styles/tailwind';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
import { Button, CSText, FocusAwareStatusBar } from '@/Components';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { useUpdateUser, useUser } from '@/Queries/user';
import { disableEnrollment2FA, sendEnrollment2FA } from '@/Services/Auth';
import { useSensitiveInfo } from '@/Hooks/useSensitiveInfo';
import { RECOVERY_CODE_KEY } from '@/Store/keys';
import { store } from '@/Store';
import { UpdateUserRequest } from '@/generated/capital';

export const validRecoveryCode = (code: string | null, userId: string) =>
  !!code && code.split('|')[1] === userId;
const getCodeOnly = (code: string | null) => code?.split('|')[0] || '';

const UpdateMobileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [mobileNumError, setMobileNumError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: user } = useUser();
  const { mutate } = useUpdateUser();
  const phoneInput = useRef<PhoneInput>(null);
  const { data: recoveryCode } = useSensitiveInfo(RECOVERY_CODE_KEY);

  const isSame = useMemo(() => `+1${mobile}` === user?.phone, [mobile, user]);

  const onChangeText = (newVal: string) => {
    setMobileNumError(false);
    setMobile(newVal);
  };

  const onSubmit = async () => {
    if (formattedValue === '+11111111111') {
      // Workaround for dev/qa who do not want a number
      await mutate({ ...user, phone: formattedValue } as UpdateUserRequest);
      Toast.show({
        type: 'success',
        text1: t('toasts.mobileSaved'),
      });
      if (navigation.getState().routeNames.find((r) => r === MainScreens.Home)) {
        navigation.navigate(MainScreens.Home);
      } else if (navigation.getState().routeNames.find((r) => r === MainScreens.Profile)) {
        navigation.navigate(MainScreens.Profile);
      } else {
        // eslint-disable-next-line no-console
        console.warn('Unknown navigation state:', navigation.getState());
      }
    } else {
      const checkValid = phoneInput.current?.isValidNumber(mobile);
      setMobileNumError(!checkValid);
      if (checkValid && user?.userId) {
        setLoading(true);
        try {
          const methodId = store.getState().session?.twoFactor?.methods?.[0].id;
          if (validRecoveryCode(recoveryCode, user.userId) && methodId) {
            await disableEnrollment2FA(getCodeOnly(recoveryCode), user?.userId, methodId);
            Toast.show({
              type: 'success',
              text1: t('toasts.previousNumberRemoved'),
            });
            await sendEnrollment2FA(formattedValue, user?.userId, 'sms');
            navigation.navigate(MainScreens.EnterOTP, { phone: formattedValue });
          } else {
            // This shouldn't happen - can't nav to this screen without it
            Toast.show({
              type: 'info',
              props: { dark: true },
              text1: t('toasts.disable2faInvalid'),
            });
          }
          setLoading(false);
        } catch (e) {
          Toast.show({
            type: 'error',
            props: { dark: true },
            text1: t('toasts.mobileSaveFailed'),
          });
          setLoading(false);
        }
      }
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView style={tw`flex-1 p-5 justify-between`} behavior="padding">
        <View>
          <BackButtonNavigator />

          <CSText style={tw`text-2xl text-black pt-8 font-telegraf mb-4`}>
            {t('profile.updatePhone.title')}
          </CSText>
          <CSText style={tw`mb-4`}>{t('profile.updatePhone.secondary')}</CSText>
          <PhoneInput
            ref={phoneInput}
            defaultCode="US"
            placeholder="xxxxxxxxxx"
            onChangeText={onChangeText}
            onChangeFormattedText={setFormattedValue}
            containerStyle={tw`bg-transparent`}
            flagButtonStyle={{ width: 40 }}
            countryPickerProps={{ countryCodes: ['US'] }}
            disableArrowIcon
            codeTextStyle={tw`text-gray-50 font-telegraf text-xl font-normal`}
            textContainerStyle={tw`bg-transparent`}
            textInputStyle={tw`text-black font-telegraf text-xl`}
            textInputProps={{
              selectionColor: tw.color('bg-primary'),
              placeholderTextColor: tw.color('black-20'),
            }}
            autoFocus
          />
        </View>
        {mobileNumError && <CSText style={tw`text-black mt-1`}>{t('enterMobile.error')}</CSText>}
        <Button
          containerStyle={[
            tw`mt-auto mb-4`,
            mobile.length !== 10 || isSame ? tw`bg-gray-5` : tw`bg-primary`,
          ]}
          onPress={onSubmit}
          disabled={mobileNumError || mobile.length !== 10 || isSame || loading}
        >
          {t('enterMobile.buttonCta')}
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UpdateMobileScreen;
