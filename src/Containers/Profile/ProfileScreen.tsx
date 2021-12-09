import React from 'react';
import { View, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import tw from '@/Styles/tailwind';
import { nameToInitials } from '@/Helpers/StringHelpers';
import { ProfileMenuRow } from '@/Containers/Profile/Components/ProfileMenuRow';
import { CloseIconButton, CSText, FocusAwareStatusBar } from '@/Components';
import { killSession } from '@/Store/Session';
import { persistor } from '@/Store';

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const apolloClient = useApolloClient();

  const onLogout = async () => {
    await apolloClient.cache.reset();
    await persistor.purge();
    dispatch(killSession());
  };

  const user = {
    name: 'John Smith',
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`} edges={['top']}>
      <FocusAwareStatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" />
      <View style={tw`flex-row justify-between p-5`}>
        <View>
          <View
            style={tw`flex items-center justify-center bg-secondary-light rounded-full h-12 w-12`}
          >
            <CSText style={tw`text-white text-xl font-telegraf`}>
              {nameToInitials(user.name)}
            </CSText>
          </View>
          <CSText style={tw`text-2xl text-white py-4`}>{user.name}</CSText>
        </View>
        <CloseIconButton color={tw.color('white')} />
      </View>

      {/* Bottom white area */}
      <View style={tw`flex-1 bg-white py-7 px-6 shadow-xl rounded-t-3xl`}>
        <CSText style={tw`text-sm text-gray50 pb-6`}>
          {t('profile.profileMenu.manageAccount').toUpperCase()}
        </CSText>

        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={tw`flex-row items-center justify-between py-6 border-b border-gray90`}
          >
            <CSText style={tw`text-base`}>{t('profile.profileMenu.faceId')}</CSText>
            <Switch
              onValueChange={() => {}}
              value
              trackColor={{
                true: tw.color('black'),
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

          <TouchableOpacity
            style={tw`flex-row items-center justify-between py-6`}
            onPress={onLogout}
          >
            <CSText style={tw`text-base text-primary`}>{t('profile.profileMenu.logOut')}</CSText>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
