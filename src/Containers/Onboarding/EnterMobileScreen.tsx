import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import Toast from 'react-native-toast-message';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from '@/Styles/tailwind';
import { Button, CSText } from '@/Components';
import { MainScreens } from '../../Navigators/NavigatorTypes';
import { OnboardingScreenTitle } from './Components/OnboardingScreenTitle';
import { useUser, useUpdateUser } from '@/Queries';
import { sendEnrollment2FA } from '@/Services/Auth';
import { UpdateUserRequest } from '../../generated/capital';

const EnterMobileScreen = () => {
  const [mobile, setMobile] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [mobileNumError, setMobileNumError] = useState(false);
  const { mutate } = useUpdateUser();
  const { t } = useTranslation();
  const { navigate, replace } = useNavigation<StackNavigationProp<ParamListBase>>();
  const { isLoading, error, data: user } = useUser();
  const phoneInput = useRef<PhoneInput>(null);

  useEffect(() => {
    if (!isLoading && !error && user?.phone) {
      setMobile(user.phone.substring(2));
      setFormattedValue(user.phone);
    }
  }, [isLoading, user, error]);

  const skip2FA = async () => {
    setLoading(true);
    await mutate({ ...user, phone: formattedValue } as UpdateUserRequest);
    Toast.show({
      type: 'success',
      text1: t('toasts.mobileSaved'),
    });
    setLoading(false);
    replace(MainScreens.Home);
  };

  const onChangeText = (newVal: string) => {
    setMobileNumError(false);
    setMobile(newVal);
  };

  const onSubmit = async () => {
    if (formattedValue === '+11111111111') {
      // Workaround for dev/qa who do not want a number
      skip2FA();
    } else {
      const checkValid = phoneInput.current?.isValidNumber(mobile);
      setMobileNumError(!checkValid);
      if (checkValid && user?.userId) {
        setLoading(true);
        try {
          await sendEnrollment2FA(formattedValue, user?.userId, 'sms');
          navigate(MainScreens.EnterOTP, { phone: formattedValue, nextScreen: MainScreens.Wallet });
        } catch (e) {
          Toast.show({
            type: 'error',
            text1: t('toasts.mobileSaveFailed'),
          });
        }
      }
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary p-6`}>
      <KeyboardAvoidingView style={tw`flex-1 pb-5 justify-between`} behavior="padding">
        <OnboardingScreenTitle
          titlePart1={t('enterMobile.titlePart1')}
          titlePart2={t('enterMobile.titlePart2')}
          subTitle={t('enterMobile.subTitle')}
        />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <PhoneInput
            ref={phoneInput}
            defaultCode="US"
            defaultValue={user?.phone?.substring(2)}
            onChangeText={onChangeText}
            onChangeFormattedText={setFormattedValue}
            containerStyle={tw`bg-transparent`}
            flagButtonStyle={{ width: 40 }}
            countryPickerProps={{ countryCodes: ['US'] }}
            disableArrowIcon
            codeTextStyle={tw`text-gray60 font-telegraf text-xl font-normal`}
            textContainerStyle={tw`bg-transparent`}
            textInputStyle={tw`text-white font-telegraf text-xl`}
            textInputProps={{
              selectionColor: tw.color('bg-primary'),
              placeholderTextColor: tw.color('white'),
            }}
            withDarkTheme
            autoFocus
          />
        )}
        {mobileNumError && <CSText style={tw`text-white mt-1`}>{t('enterMobile.error')}</CSText>}
        <Button
          containerStyle={[tw`mt-auto mb-4`, mobile.length !== 10 ? tw`bg-gray98` : tw`bg-primary`]}
          onPress={onSubmit}
          disabled={mobileNumError || mobile.length !== 10 || loading}
        >
          {t('enterMobile.buttonCta')}
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EnterMobileScreen;
