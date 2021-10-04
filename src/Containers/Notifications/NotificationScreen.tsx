import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';
import { CloseIconButton } from '@/Components/CloseButton';
import { NotificationRow } from '@/Containers/Notifications/NotificationRow';

const NotificationScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={tw`flex-1 bg-lightBG`} edges={['top']}>
      <View style={tw`flex p-5`}>
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-2xl font-bold text-copy`}>Notifications</Text>
          <CloseIconButton />
        </View>
        <Text style={tw`text-sm text-primary mt-2`}>
          {t('notifications.youHaveNew', { newNotifications: '3' })}
        </Text>
      </View>

      {/* Bottom white area */}
      <View style={tw`flex-1 bg-white py-6 px-4 shadow-xl rounded-t-3xl`}>
        <NotificationRow id="123" />
        <NotificationRow id="124" />
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
