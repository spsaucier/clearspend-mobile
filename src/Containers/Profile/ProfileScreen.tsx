import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import type { StackNavigationProp } from '@react-navigation/stack';
import tw from '@/Styles/tailwind';
import { ProfileMenuRow } from '@/Containers/Profile/Components/ProfileMenuRow';
import { CSText, FocusAwareStatusBar, ActivityIndicator } from '@/Components';
import { useAuthentication } from '@/Hooks/useAuthentication';
import { useUser } from '@/Queries';
import { EmailIcon, PhoneIcon } from '@/Components/Icons';
import { AddressDisplay } from './Components/AddressDisplay';
import { formatPhone } from '@/Helpers/StringHelpers';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
import { getCappedFontScale } from '@/Helpers/StyleHelpers';
import { useAllPermissions } from '@/Queries/permissions';
import { showAdmin } from '@/Helpers/PermissionsHelpers';
import { MainStackParamTypes, MainScreens } from '@/Navigators/NavigatorTypes';

const ProfileScreen = () => {
  const { navigate } =
    useNavigation<StackNavigationProp<MainStackParamTypes, MainScreens.ProfileScreen>>();
  const { t } = useTranslation();
  const { isLoading, error, data: user } = useUser();
  const { data: permissions } = useAllPermissions();
  const { logout } = useAuthentication();
  const version = getVersion();
  const buildNumber = getBuildNumber();

  const showAdminRow = showAdmin(permissions);

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`} edges={['top', 'bottom']}>
      <FocusAwareStatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" />
      <View style={tw`p-5`}>
        <BackButtonNavigator theme="dark" />
      </View>
      <ScrollView>
        <View style={[tw`bg-secondary px-5`]}>
          {isLoading || error || !user ? (
            <View style={tw`items-center`}>
              <ActivityIndicator />
            </View>
          ) : (
            <>
              <CSText
                style={tw`text-3xl font-montreal font-light text-white mb-10`}
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
        <View style={tw`px-5 mt-14 mb-32`}>
          {/* Bottom white area */}
          <View style={tw`bg-white rounded-1`}>
            <ProfileMenuRow
              title={t('profile.profileMenu.updatePersonalDetails')}
              onPress={() => {
                navigate(MainScreens.UpdateAccount);
              }}
              style={tw`h-14 px-4`}
              showBottomBorder
            />
            <ProfileMenuRow
              title={t('profile.profileMenu.loginOptions')}
              onPress={() => {
                navigate(MainScreens.LoginOptions);
              }}
              style={tw`h-14 px-4`}
              showBottomBorder
            />
            <ProfileMenuRow
              title={t('profile.profileMenu.activateCard')}
              onPress={() => {
                navigate(MainScreens.ActivateCard);
              }}
              style={tw`h-14 px-4`}
              showBottomBorder
            />
            {__DEV__ ? (
              <ProfileMenuRow
                title={t('profile.profileMenu.notifications')}
                onPress={() => {
                  navigate(MainScreens.NotificationSettings);
                }}
                style={tw`h-14 px-4`}
                showBottomBorder
              />
            ) : null}
            <ProfileMenuRow
              title={t('profile.legalDocs.title')}
              onPress={() => {
                navigate(MainScreens.LegalDocuments);
              }}
              style={tw`h-14 px-4`}
              showBottomBorder={showAdminRow}
            />
            {showAdminRow && (
              <ProfileMenuRow
                testID="profile-menu-admin-row"
                title={t('profile.profileMenu.admin')}
                onPress={() => {
                  navigate(MainScreens.Admin);
                }}
                style={tw`h-14 px-4`}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <View style={tw`items-center mt-auto px-5 py-4`}>
        <TouchableOpacity onPress={logout}>
          <CSText style={tw`text-primary py-3`}>{t('profile.profileMenu.logOut')}</CSText>
        </TouchableOpacity>
        <CSText style={tw`text-sm text-white`} allowFontScaling={false}>
          {t('profile.appVersion', { appVersion: `${version} (${buildNumber})` })}
        </CSText>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
