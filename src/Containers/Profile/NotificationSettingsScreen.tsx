import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';
import { ProfileSettingsHeader } from '@/Containers/Profile/Components/ProfileSettingHeader';

const NotificationSettingScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={tw`bg-white flex-1 p-5`}>
      <ProfileSettingsHeader title={t('profile.notificationSettings.title')} />
    </SafeAreaView>
  );
};

export default NotificationSettingScreen;
