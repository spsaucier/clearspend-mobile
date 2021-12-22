import React from 'react';
import { View, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import tw from '@/Styles/tailwind';
import { ProfileMenuRow } from '@/Containers/Profile/Components/ProfileMenuRow';
import { CSText, FocusAwareStatusBar, Button } from '@/Components';
import { killSession } from '@/Store/Session';
import { persistor } from '@/Store';
import { mixpanel } from '@/Services/utils/analytics';

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const apolloClient = useApolloClient();

  const onLogout = async () => {
    await apolloClient.cache.reset();
    await persistor.purge();
    mixpanel.track('Logout');
    dispatch(killSession());
  };

  const user = {
    name: 'John Smith',
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`} edges={['top']}>
      <FocusAwareStatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" />
      <View style={tw`flex-col justify-between pl-4 pr-20 pt-20 pb-28`}>
        <CSText style={tw`text-xl text-white`}>{user.name}</CSText>
        <CSText style={tw`text-sm text-primary pt-2`}>{t('profile.profileInfo')}</CSText>
      </View>

      {/* Bottom white area */}
      <View style={tw`flex-1 bg-white py-7 px-6 shadow-xl`}>
        <CSText style={tw`text-base text-black pb-6 mt-4`}>
          {t('profile.profileMenu.manageAccount')}
        </CSText>

        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={tw`flex-row items-center justify-between py-2 mt-3`}>
            <CSText style={tw`text-sm`}>{t('profile.profileMenu.faceId')}</CSText>
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
          <View style={tw`mt-10`}>
            <Button
              containerStyle={tw`mt-auto bg-secondary`}
              textStyle={tw`text-white`}
              onPress={onLogout}
            >
              {t('profile.profileMenu.logOut')}
            </Button>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
