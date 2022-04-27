import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import { CSText, FocusAwareStatusBar } from '@/Components';
import { useAllPermissions } from '@/Queries/permissions';
import {
  showManageUsers,
  showManageCards,
  showManagePermissions,
  getRole,
} from '@/Helpers/PermissionsHelpers';
import { ProfileMenuRow } from '@/Containers/Profile/Components/ProfileMenuRow';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
import { AllocationRoles } from '@/Types/permissions';

const AdminHomeScreen = () => {
  const { t } = useTranslation();
  const { data: permissions } = useAllPermissions();

  const showManageUsersRow = showManageUsers(permissions);
  const showManageCardsRow = showManageCards(permissions);
  const showManagePermissionsRow = showManagePermissions(permissions);

  const role = getRole(permissions);

  return (
    <SafeAreaView style={tw`flex-1 bg-tan`}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={tw`p-5`}>
        <BackButtonNavigator theme="light" />
      </View>
      <View style={[tw`px-5`]}>
        <CSText style={tw`font-telegraf text-base text-2xl font-light text-black leading-6 mb-5`}>
          Role:{' '}
          {role === AllocationRoles.Manager
            ? t('profile.profileMenu.manager')
            : t('profile.profileMenu.admin')}
        </CSText>
        <View style={tw`bg-white rounded-1`}>
          {showManageUsersRow && (
            <ProfileMenuRow
              testID="profile-menu-manage-users-row"
              title={t('adminOptions.viewEmployees')}
              onPress={() => {}}
              style={tw`h-14 px-4`}
              borderColor="border-tan"
              showBottomBorder
            />
          )}
          {showManageCardsRow && (
            <ProfileMenuRow
              testID="profile-menu-manage-cards-row"
              title={t('adminOptions.issueACard')}
              onPress={() => {}}
              style={tw`h-14 px-4`}
              borderColor="border-tan"
              showBottomBorder
            />
          )}
          {showManagePermissionsRow && (
            <ProfileMenuRow
              testID="profile-menu-manage-permissions-row"
              title={t('adminOptions.increaseALimit')}
              onPress={() => {}}
              style={tw`h-14 px-4`}
              showBottomBorder={false}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AdminHomeScreen;
