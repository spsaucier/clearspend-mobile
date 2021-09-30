import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';

const NotificationScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={tw`flex-1 bg-lightBG`} edges={['top']}>
      <View style={tw`flex p-5`}>
        <View style={tw`flex items-center justify-center bg-primary rounded-full h-12 w-12`}>
          <Text style={tw`text-white text-xl`}>MH</Text>
        </View>
        <Text style={tw`text-2xl font-bold text-copy py-4`}>Notifications</Text>
      </View>

      {/* Bottom white area */}
      <View style={tw`flex-1 bg-white py-7 px-6 shadow-xl rounded-t-3xl`}>
        <Text style={tw`text-sm text-gray50 pb-6`}>
          {t('profile.profileMenu.manageAccount').toUpperCase()}
        </Text>

        <TouchableOpacity
          style={tw`flex-row items-center justify-between py-6 border-b border-gray90`}
        >
          <Text style={tw`text-base text-copy`}>Notifications</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
