import { useMMKVBoolean } from 'react-native-mmkv';
import { Constants } from '@/consts';
import { useFeatureFlag } from '@/Hooks/useFeatureFlag';

const useNotificationsSettings = () => {
  const [allowNotifications, setAllowNotifications] = useMMKVBoolean(
    Constants.PERMISSION_ALL_NOTIFICATIONS,
  );
  const [onboardingNotificationsFirstCheck, setOnboardingNotificationsFirstCheck] = useMMKVBoolean(
    Constants.PERMISSION_NOTIFICATIONS_FIRST_CHECK,
  );
  const { enabled: notificationsEnabled } = useFeatureFlag('notifications');

  const resetNotificationsSettings = () => {
    setOnboardingNotificationsFirstCheck(false);
    setAllowNotifications(false);
  };

  return {
    shouldPromptEnableNotificationsOnboarding:
      notificationsEnabled && !onboardingNotificationsFirstCheck,
    allowNotifications,
    setAllowNotifications,
    setOnboardingNotificationsFirstCheck,
    resetNotificationsSettings,
  };
};

export default useNotificationsSettings;
