import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';
import { CloseIconButton } from '@/Components/CloseButton';
import { NotificationRow } from '@/Containers/Notifications/NotificationRow';
import { CSText, FocusAwareStatusBar } from '@/Components';

const NotificationScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={tw`flex-1 bg-forest-green`}>
      <FocusAwareStatusBar backgroundColor={tw.color('forest-green')} barStyle="light-content" />
      <View style={tw`flex px-5 py-7`}>
        <View style={tw`flex-row items-center justify-between`}>
          <CSText style={tw`text-2xl text-white font-telegraf`}>Notifications</CSText>
          <CloseIconButton color={tw.color('white')} />
        </View>
        <CSText style={tw`text-sm text-white mt-2`}>
          {t('notifications.youHaveNew', { newNotifications: '3' })}
        </CSText>
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
