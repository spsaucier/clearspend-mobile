import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import tw from '@/Styles/tailwind';
import { Button, CSText } from '@/Components';
import { MainScreens } from '../../Navigators/NavigatorTypes';
import { OnboardingScreenTitle } from './Components/OnboardingScreenTitle';
import { useUser } from '@/Queries';
import { sendEnrollment2FA } from '@/Services/Auth';
import { updateUser } from '@/Queries/user';

const EnterMobileScreen = () => {
  const [mobile, setMobile] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [mobileNumError, setMobileNumError] = useState(false);

  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const { isLoading, error, data: user } = useUser();
  const phoneInput = useRef<PhoneInput>(null);

  useEffect(() => {
    if (!isLoading && !error && user) {
      setMobile(user.phone ? user.phone.substring(2) : '');
    }
  }, [isLoading, user, error]);

  const onSubmit = async () => {
    const checkValid = phoneInput.current?.isValidNumber(mobile);
    setMobileNumError(!checkValid);
    if (checkValid && user?.userId) {
      if (formattedValue === '+11111111111') {
        // Workaround for dev/qa who do not want a number
        await updateUser({ ...user, phone: formattedValue });
        navigate(MainScreens.Wallet);
      } else {
        try {
          await sendEnrollment2FA(formattedValue, user?.userId, 'sms');
          navigate(MainScreens.ConfirmMobile, { phone: formattedValue });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.info(e);
          // TODO: show toast for failure
        }
      }
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
            onChangeText={setMobile}
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
        {mobileNumError && (
          <CSText style={tw`text-white mt-1`}>
            {t('enterMobile.error')}
          </CSText>
        )}
        <Button
          containerStyle={[tw`mt-auto mb-4`, mobile.length < 10 ? tw`bg-gray98` : tw`bg-primary`]}
          onPress={onSubmit}
          disabled={mobileNumError}
        >
          {t('enterMobile.buttonCta')}
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EnterMobileScreen;
