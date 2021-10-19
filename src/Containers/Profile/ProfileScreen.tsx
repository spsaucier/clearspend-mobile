import React from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';
import { nameToInitials } from '@/Helpers/StringHelpers';
import { ProfileMenuRow } from '@/Containers/Profile/Components/ProfileMenuRow';
import { CloseIconButton } from '@/Components';

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();
  const user = {
    name: 'John Smith',
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-lightBG`} edges={['top']}>
      <View style={tw`flex-row justify-between p-5`}>
        <View>
          <View style={tw`flex items-center justify-center bg-primary rounded-full h-12 w-12`}>
            <Text style={tw`text-white text-xl`}>{nameToInitials(user.name)}</Text>
          </View>
          <Text style={tw`text-2xl font-bold text-copyDark py-4`}>{user.name}</Text>
        </View>
        <CloseIconButton />
      </View>

      {/* Bottom white area */}
      <View style={tw`flex-1 bg-white py-7 px-6 shadow-xl rounded-t-3xl`}>
        <Text style={tw`text-sm text-gray50 pb-6`}>
          {t('profile.profileMenu.manageAccount').toUpperCase()}
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={tw`flex-row items-center justify-between py-6 border-b border-gray90`}
          >
            <Text style={tw`text-base text-copyDark`}>{t('profile.profileMenu.faceId')}</Text>
            <Switch
              onValueChange={() => {}}
              value
              trackColor={{
                true: tw.color('primary'),
                false: tw.color('gray80'),
              }}
              ios_backgroundColor={tw.color('white')}
              thumbColor={tw.color('white')}
            />
          </TouchableOpacity>

          <ProfileMenuRow
            label={t('profile.profileMenu.biometrics')}
            onPress={() => {
              navigation.navigate('Profile');
            }}
          />

          <ProfileMenuRow
            label={t('profile.profileMenu.changePassword')}
            onPress={() => {
              navigation.navigate('Change Password');
            }}
          />

          <ProfileMenuRow
            label={t('profile.profileMenu.notificationSettings')}
            onPress={() => {
              navigation.navigate('Notification Settings');
            }}
          />

          <ProfileMenuRow
            label={t('profile.profileMenu.viewAuditLog')}
            onPress={() => {
              navigation.navigate('Audit Log');
            }}
          />

          <ProfileMenuRow
            label={t('profile.profileMenu.changeCompany')}
            onPress={() => {
              navigation.navigate('Profile');
            }}
          />

          <TouchableOpacity style={tw`flex-row items-center justify-between py-6`}>
            <Text style={tw`text-base text-primary`}>{t('profile.profileMenu.logOut')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
