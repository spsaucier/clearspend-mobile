import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

// import { useNewAllocationContext } from '@/Hooks/useNewAllocationContext';
import {
  AdminScreens,
  AdminStackParamTypes,
  CreateAllocationScreens,
  CreateAllocationStackParamTypes,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import AdminScreenWrapper from '../Components/AdminScreenWrapper';
// import tw from '@/Styles/tailwind';

const SpendControlsScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<CreateAllocationStackParamTypes & AdminStackParamTypes>
    >();
  // const { selectedLabel, setSelectedLabel } = useNewAllocationContext();

  return (
    <AdminScreenWrapper
      title={t('adminFlows.createAllocation.spendControlsTitle')}
      onPrimaryAction={() => navigate(CreateAllocationScreens.ConfirmDetails)}
      // primaryActionDisabled={!selectedLabel}
      onClose={() => navigate(AdminScreens.Allocations)}
    >
      <View />
    </AdminScreenWrapper>
  );
};

export default SpendControlsScreen;
