import React from 'react';
import { View, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import tw from '@/Styles/tailwind';
import { ProfileMenuRow } from '@/Containers/Profile/Components/ProfileMenuRow';
import { CSText, FocusAwareStatusBar, Button, CloseIconButton } from '@/Components';
import { killSession } from '@/Store/Session';
import { persistor } from '@/Store';
import { mixpanel } from '@/Services/utils/analytics';
import { MainScreens } from '@/Navigators/NavigatorTypes';

const ProfileScreen = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onLogout = async () => {
    await persistor.purge();
    mixpanel.track('Logout');
    dispatch(killSession());
  };

  // TODO: use real user name
  const user = {
    name: 'John Smith',
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`} edges={['top']}>
      <FocusAwareStatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" />
      <View style={tw`flex-row items-center justify-end pr-6 pt-6`}>
        <CloseIconButton color={tw.color('white')} />
      </View>
      <View style={[tw`h-1/4 flex-col justify-center bg-secondary px-5 pt-12 pb-16`]}>
        <CSText style={tw`text-2xl text-white`}>{user.name}</CSText>
        <CSText style={tw`text-sm text-primary pt-2`}>{t('profile.profileInfo')}</CSText>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`flex-1 bg-white`}
        contentContainerStyle={tw`flex-grow bg-white`}
      >
        {/* Bottom white area */}
        <View style={tw`bg-white py-7 px-6 flex-1 justify-between`}>
          <View>
            <CSText style={tw`text-base text-black pb-6 mt-4`}>
              {t('profile.profileMenu.manageAccount')}
            </CSText>

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
                navigate(MainScreens.ChangePassword);
              }}
            />

            <ProfileMenuRow
              label={t('profile.profileMenu.notificationSettings')}
              onPress={() => {
                navigate(MainScreens.NotificationSettings);
              }}
            />

            <ProfileMenuRow
              label={t('profile.profileMenu.viewAuditLog')}
              onPress={() => {
                navigate(MainScreens.AuditLog);
              }}
            />
          </View>
          <View style={tw`my-5`}>
            <Button
              containerStyle={tw`mt-auto bg-secondary`}
              textStyle={tw`text-white`}
              onPress={onLogout}
            >
              {t('profile.profileMenu.logOut')}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
