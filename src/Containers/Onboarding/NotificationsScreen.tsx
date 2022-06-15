import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Alert, AppState, Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { checkNotifications, requestNotifications } from 'react-native-permissions';
import { useIsFocused } from '@react-navigation/core';
import tw from '@/Styles/tailwind';
import { Button, CSText, ToggleSwitch } from '@/Components';
import useNotificationsSettings from '@/Hooks/useNotificationsSettings';

const OnboardingNotificationsScreen = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const { allowNotifications, setAllowNotifications, setOnboardingNotificationsFirstCheck } =
    useNotificationsSettings();
  const [isBlockedByOS, setIsBlockedByOS] = useState(false);

  const onAllowNotificationsSwitchChange = (active: boolean) => {
    if (active) {
      requestNotifications(['alert', 'sound']).then((result) => {
        setAllowNotifications(result.status === 'granted');
      });
    } else setAllowNotifications(false);
  };

  const onContinue = () => {
    setOnboardingNotificationsFirstCheck(true);
  };

  useEffect(() => {
    if (isFocused) {
      checkNotifications().then(({ status }) => {
        setIsBlockedByOS(status === 'blocked');

        if (status === 'granted') {
          setAllowNotifications(true);
        }
      });
    }
  }, [isFocused]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkNotifications().then(({ status }) => {
          const blocked = status === 'blocked';
          setIsBlockedByOS(blocked);
          if (blocked && allowNotifications) {
            setAllowNotifications(false);
          }
        });
      }
    });
    return () => subscription.remove();
  }, [allowNotifications]);

  return (
    <SafeAreaView style={tw`p-4 flex-1 `}>
      <ScrollView style={tw`flex-1`} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={tw`flex-1`}>
          <CSText style={tw`text-2xl text-white mt-10`}>
            <Trans
              i18nKey={t('onBoardingNotificationsSetting.heading')}
              components={{
                key1: <CSText style={tw`text-2xl text-primary`} />,
              }}
            />
          </CSText>

          <CSText style={tw`mt-6 text-sm text-white`}>
            {t('onBoardingNotificationsSetting.notificationQuestion')}
          </CSText>

          <CSText style={tw`mt-6 text-sm text-white`}>
            {t('onBoardingNotificationsSetting.notificationsExplanation')}
          </CSText>

          <View style={tw`bg-tan rounded w-full flex-row justify-between p-4 mt-6 items-center`}>
            <CSText style={tw`text-sm`}>{t('onBoardingNotificationsSetting.notifications')}</CSText>
            <TouchableOpacity
              disabled={!isBlockedByOS}
              onPress={() => {
                Alert.alert(
                  '',
                  t('onBoardingNotificationsSetting.enableNotificationsUsingSettings'),
                  [
                    {
                      text: t('onBoardingNotificationsSetting.cancel'),
                      onPress: () => null,
                    },
                    {
                      text: t('onBoardingNotificationsSetting.settings'),
                      onPress: () => Linking.openSettings(),
                    },
                  ],
                );
              }}
            >
              <ToggleSwitch
                value={allowNotifications}
                disabled={isBlockedByOS}
                toggleSwitch={onAllowNotificationsSwitchChange}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Button onPress={onContinue} loading={false} testID="">
          {t('onBoardingNotificationsSetting.continue')}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingNotificationsScreen;
