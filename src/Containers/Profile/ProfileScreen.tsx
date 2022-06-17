import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import tw from '@/Styles/tailwind';
import { ProfileMenuRow } from '@/Containers/Profile/Components/ProfileMenuRow';
import { CSText, FocusAwareStatusBar, ActivityIndicator } from '@/Components';
import { useAuthentication } from '@/Hooks/useAuthentication';
import { useUser } from '@/Queries';
import { EmailIcon, PhoneIcon } from '@/Components/Icons';
import { AddressDisplay } from './Components/AddressDisplay';
import { formatPhone } from '@/Helpers/StringHelpers';
import { getCappedFontScale } from '@/Helpers/StyleHelpers';
import { ProfileScreens, ProfileStackProps } from '@/Navigators/Profile/ProfileNavigatorTypes';
import { useFeatureFlag } from '@/Hooks/useFeatureFlag';

const ProfileScreen = () => {
  const { navigate } = useNavigation<ProfileStackProps>();
  const { t } = useTranslation();
  const { isLoading, error, data: user } = useUser();
  const { logout } = useAuthentication();
  const version = getVersion();
  const buildNumber = getBuildNumber();

  const { enabled: devMenuEnabled } = useFeatureFlag('view-dev-menu');
  const { enabled: notificationsEnabled } = useFeatureFlag('notifications');

  const showDevMenuRow = devMenuEnabled || __DEV__;

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`} edges={['top']}>
      <FocusAwareStatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" />
      <ScrollView style={tw`mt-5`}>
        <View style={[tw`bg-secondary px-5`]}>
          {isLoading || error || !user ? (
            <View style={tw`items-center`}>
              <ActivityIndicator />
            </View>
          ) : (
            <>
              <CSText
                style={tw`text-3xl font-montreal font-light text-white my-8`}
                testID="full-name"
              >
                {`${user.firstName} ${user.lastName}`}
              </CSText>
              <View style={tw`flex-row mb-3`}>
                <EmailIcon size={20 * getCappedFontScale()} />
                <CSText style={tw`text-white text-sm ml-3 leading-5 flex-shrink-1`}>
                  {user.email}
                </CSText>
              </View>
              {user.phone ? (
                <View style={tw`flex-row mb-3`}>
                  <PhoneIcon size={20 * getCappedFontScale()} />
                  <CSText style={tw`text-white text-sm ml-3 leading-5`}>
                    {formatPhone(user.phone)}
                  </CSText>
                </View>
              ) : null}
              <AddressDisplay address={user.address || {}} />
            </>
          )}
        </View>
        <View style={tw`px-5 mt-12`}>
          {/* Bottom white area */}
          <View style={tw`bg-white rounded-1`}>
            <ProfileMenuRow
              title={t('profile.profileMenu.updatePersonalDetails')}
              onPress={() => {
                navigate(ProfileScreens.UpdateAccount);
              }}
              style={tw`h-14 px-4`}
              showBottomBorder
            />
            <ProfileMenuRow
              title={t('profile.profileMenu.loginOptions')}
              onPress={() => {
                navigate(ProfileScreens.LoginOptions);
              }}
              style={tw`h-14 px-4`}
              showBottomBorder
            />
            <ProfileMenuRow
              title={t('profile.profileMenu.activateCard')}
              onPress={() => {
                navigate(ProfileScreens.ActivateCard);
              }}
              style={tw`h-14 px-4`}
              showBottomBorder
            />
            {notificationsEnabled ? (
              <ProfileMenuRow
                title={t('profile.profileMenu.notifications')}
                onPress={() => {
                  navigate(ProfileScreens.NotificationSettings);
                }}
                style={tw`h-14 px-4`}
                showBottomBorder
              />
            ) : null}
            <ProfileMenuRow
              title={t('profile.legalDocs.title')}
              onPress={() => {
                navigate(ProfileScreens.LegalDocuments);
              }}
              style={tw`h-14 px-4`}
              showBottomBorder={showDevMenuRow}
            />
            {showDevMenuRow ? (
              <ProfileMenuRow
                testID="profile-menu-dev-row"
                title="Dev Menu"
                onPress={() => {
                  navigate(ProfileScreens.DevMenu);
                }}
                style={tw`h-14 px-4`}
              />
            ) : null}
          </View>
          <View style={tw`items-center mt-8 mb-16 px-5`}>
            <TouchableOpacity onPress={logout}>
              <CSText style={tw`text-primary mb-2`}>{t('profile.profileMenu.logOut')}</CSText>
            </TouchableOpacity>
            <CSText style={tw`text-xs text-white`} allowFontScaling={false}>
              {t('profile.appVersion', { appVersion: `${version} (${buildNumber})` })}
            </CSText>
          </View>
        </View>
      </ScrollView>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.25)']}
        style={tw`absolute left-0 right-0 bottom-0 h-12`}
        pointerEvents="none"
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
