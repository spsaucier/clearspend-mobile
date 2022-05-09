import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { checkNotifications } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { useMMKVBoolean } from 'react-native-mmkv';
import { Constants } from '@/consts';

export const useNotificationSubscription = () => {
  const [permissionAllNotifications] = useMMKVBoolean(Constants.PERMISSION_ALL_NOTIFICATIONS);
  const [notificationsBlockedByOS, setNotificationsBlockedByOS] = useState<boolean>(false);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkNotifications().then(({ status }) => {
          setNotificationsBlockedByOS(status === 'blocked');
        });
      }
    });
    return () => subscription.remove();
  }, [setNotificationsBlockedByOS, notificationsBlockedByOS]);

  // Register foreground FCM listener
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('Received foreground FCM message', JSON.stringify(remoteMessage, null, 2));
      }

      Toast.show({
        text1: remoteMessage.notification?.body,
      });
    });

    if (!permissionAllNotifications || notificationsBlockedByOS) {
      unsubscribe();
    }

    return unsubscribe;
  }, [permissionAllNotifications, notificationsBlockedByOS]);
};
