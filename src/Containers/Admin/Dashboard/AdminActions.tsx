import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import { useAllPermissions } from '@/Queries/permissions';
import { showManageUsers, showManagePermissions } from '@/Helpers/PermissionsHelpers';
import { TileButton } from '@/Components/TileButton';
import { ActivityIndicator } from '@/Components/ActivityIndicator';
import { UsersThreeIcon, CoinNoBgIcon } from '@/Components/Icons';

interface Props {
  onEmployeesPress: () => void;
  onAllocationsPress: () => void;
}

const AdminActions = ({ onEmployeesPress, onAllocationsPress }: Props) => {
  const { t } = useTranslation();
  const { data: permissions, isLoading } = useAllPermissions();

  return (
    <View style={tw`flex-row bg-white py-6`}>
      {isLoading ? (
        <View style={tw`flex-1 items-center justify-center my-6`}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          {showManageUsers(permissions) && (
            <TileButton
              testID="admin-actions-employees"
              style={tw`w-1/2 pr-3`}
              text={t('admin.employees.employeesTitle')}
              icon={<UsersThreeIcon />}
              onPress={onEmployeesPress}
            />
          )}
          {showManagePermissions(permissions) && (
            <TileButton
              testID="admin-actions-allocations"
              style={tw`w-1/2 pl-3`}
              text={t('admin.allocations.allocationsTitle')}
              icon={<CoinNoBgIcon />}
              onPress={onAllocationsPress}
            />
          )}
        </>
      )}
    </View>
  );
};

export default AdminActions;
