import React, { useEffect, useLayoutEffect, useState } from 'react';
import { AppState, Linking, Platform, View, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { checkNotifications, requestNotifications } from 'react-native-permissions';
import { useMMKVBoolean } from 'react-native-mmkv';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { TouchableOpacity, Switch } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { ProfileSettingsHeader } from '@/Containers/Profile/Components/ProfileSettingHeader';
import { NotificationBellGreenIcon } from '@/Components/Icons';
import tw from '@/Styles/tailwind';
import { CSText, FocusAwareStatusBar } from '@/Components';
import { Constants } from '@/consts';

import { MainScreens } from '@/Navigators/NavigatorTypes';

const NotificationSettingsScreen = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const { navigate } = useNavigation();
  const [permissionAllNotifications, setPermissionAllNotifications] = useMMKVBoolean(
    Constants.PERMISSION_ALL_NOTIFICATIONS,
  );
  const [isBlockedByOS, setIsBlockedByOS] = useState<boolean>();

  const turnOffNotifications = () => {
    setPermissionAllNotifications(false);
    Toast.show({
      type: 'success',
      text1: t('toasts.notificationsHaveBeenTurnedOff'),
    });
  };

  const toggleSwitch = (value: boolean) => {
    if (value) {
      requestNotifications(['alert', 'badge']).then((permissionStatus) => {
        const granted = permissionStatus.status === 'granted';
        setPermissionAllNotifications(granted);
        setIsBlockedByOS(permissionStatus.status === 'blocked');
      });
    } else {
      turnOffNotifications();
    }
  };

  // when navigates into this screen
  useLayoutEffect(() => {
    if (isFocused) {
      checkNotifications().then(({ status }) => {
        setIsBlockedByOS(status === 'blocked');
      });
    }
  }, [isFocused]);

  // when appstate changes, ie app goes background/foreground
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkNotifications().then(({ status }) => {
          const blocked = status === 'blocked';
          setIsBlockedByOS(blocked);
          if (blocked && permissionAllNotifications) {
            turnOffNotifications();
          }
        });
      }
    });
    return () => subscription.remove();
  }, [setPermissionAllNotifications, permissionAllNotifications]);

  return (
    <SafeAreaView style={tw`bg-white flex-1 p-5`}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ProfileSettingsHeader
        title={t('profile.notificationSettings.title')}
        icon={<NotificationBellGreenIcon />}
      />

      <View style={tw`rounded p-4 my-6 bg-tan justify-between items-center flex-row`}>
        <CSText>{t('profile.notificationSettings.allNotifications')}</CSText>
        <TouchableOpacity
          disabled={!isBlockedByOS}
          onPress={() => {
            Alert.alert('', t('profile.notificationSettings.enableNotificationsUsingSettings'), [
              {
                text: t('profile.notificationSettings.cancel'),
                onPress: () => navigate(MainScreens.NotificationSettings),
              },
              {
                text: t('profile.notificationSettings.settings'),
                onPress: () => Linking.openSettings(),
              },
            ]);
          }}
        >
          <Switch
            onValueChange={toggleSwitch}
            value={permissionAllNotifications}
            disabled={isBlockedByOS}
            thumbColor={Platform.select({
              ios: tw.color('white'),
              android:
                permissionAllNotifications === true ? tw.color('primary') : tw.color('gray-50'),
            })}
            trackColor={{
              false: tw.color('gray-10'),
              true: Platform.OS === 'ios' ? tw.color('bg-secondary') : tw.color('gray-10'),
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NotificationSettingsScreen;
