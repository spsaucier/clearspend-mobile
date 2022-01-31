import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import tw from '@/Styles/tailwind';
import { Button, CSText } from '@/Components';
import { AuthScreens } from '../../Navigators/NavigatorTypes';
import { USFlagIcon } from '@/Components/Icons/USFlagIcon';
import { OnboardingScreenTitle } from './Components/OnboardingScreenTitle';

const EnterMobileScreen = () => {
  const [mobile, setMobile] = useState('');
  const [mobileNumError, setMobileNumError] = useState(false);

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const route = useRoute<any>();
  const { params } = route;
  const mobileNumRegex = new RegExp(/^[0-9\b]+$/);
  // const { isLoading, error, data: user } = useUser();

  const validateMobileNumber = () => {
    if (mobile.length > 1 && !mobileNumRegex.test(mobile)) {
      setMobileNumError(true);
    } else if (mobile.length === 1 || mobileNumRegex.test(mobile)) {
      setMobileNumError(false);
    }
  };

  useEffect(() => {
    setSubmitButtonDisabled(!mobileNumRegex.test(mobile));
  }, [mobile]);
  return (
    <SafeAreaView style={tw`flex-1 bg-secondary p-6`}>
      <KeyboardAvoidingView style={tw`flex-1 pb-5 justify-between`} behavior="padding">
        <OnboardingScreenTitle
          titlePart1={t('enterMobile.titlePart1')}
          titlePart2={t('enterMobile.titlePart2')}
          subTitle={t('enterMobile.subTitle')}
          titlePart3=""
        />
        <View style={tw`flex flex-row`}>
          <View style={tw.style('flex-row items-center justify-center mt-1')}>
            <USFlagIcon />
            <CSText style={tw`ml-4 text-white font-telegraf mt-1 text-xl`}>+1</CSText>
          </View>
          <TextInput
            style={tw`text-white w-full ml-4 mt-2`}
            autoCorrect
            autoFocus
            keyboardType="number-pad"
            selectionColor={tw.color('bg-primary')}
            scrollEnabled
            value={mobile}
            onChangeText={(value) => setMobile(value)}
            onChange={validateMobileNumber}
            maxLength={10}
          />
        </View>
        {mobileNumError && (
          <Text style={tw`text-white mt-10 font-bold`}>Please enter correct mobile number.</Text>
        )}
        <Button
          containerStyle={[tw`mt-auto mb-4`, mobile.length < 10 ? tw`bg-gray98` : tw`bg-primary`]}
          onPress={() => {
            navigate(AuthScreens.EnterOTP, params);
          }}
          disabled={submitButtonDisabled}
        >
          {t('enterMobile.buttonCta')}
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EnterMobileScreen;
