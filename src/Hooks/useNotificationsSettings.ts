import { useMMKVBoolean } from 'react-native-mmkv';
import { Constants } from '@/consts';

const useNotificationsSettings = () => {
  const [allowNotifications, setAllowNotifications] = useMMKVBoolean(
    Constants.PERMISSION_ALL_NOTIFICATIONS,
  );
  const [onboardingNotificationsFirstCheck, setOnboardingNotificationsFirstCheck] = useMMKVBoolean(
    Constants.PERMISSION_NOTIFICATIONS_FIRST_CHECK,
  );

  const resetNotificationsSettings = () => {
    setOnboardingNotificationsFirstCheck(false);
    setAllowNotifications(false);
  };

  return {
    allowNotifications,
    onboardingNotificationsFirstCheck,
    setAllowNotifications,
    setOnboardingNotificationsFirstCheck,
    resetNotificationsSettings,
  };
};

export default useNotificationsSettings;
