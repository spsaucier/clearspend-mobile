import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import { TileButton } from '@/Components/TileButton';
import { UsersThreeIcon, CoinNoBgIcon } from '@/Components/Icons';

interface Props {
  onEmployeesPress: () => void;
  onAllocationsPress: () => void;
}

const AdminActions = ({ onEmployeesPress, onAllocationsPress }: Props) => {
  const { t } = useTranslation();

  return (
    <View style={tw`flex-row bg-white py-6`}>
      <TileButton
        testID="admin-actions-employees"
        style={tw`w-1/2 pr-3`}
        text={t('admin.employees.employeesTitle')}
        icon={<UsersThreeIcon />}
        onPress={onEmployeesPress}
      />
      <TileButton
        testID="admin-actions-allocations"
        style={tw`w-1/2 pl-3`}
        text={t('admin.allocations.allocationsTitle')}
        icon={<CoinNoBgIcon />}
        onPress={onAllocationsPress}
      />
    </View>
  );
};

export default AdminActions;
