import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { AlphabetList, IData } from 'react-native-section-alphabet-list';
import LinearGradient from 'react-native-linear-gradient';

import { useNewAllocationContext } from '@/Hooks/useNewAllocationContext';
import {
  AdminScreens,
  AdminStackParamTypes,
  CreateAllocationScreens,
  CreateAllocationStackParamTypes,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import AdminScreenWrapper from '../Components/AdminScreenWrapper';
import tw from '@/Styles/tailwind';
import { ActivityIndicator } from '@/Components';
import { getUserInitials } from '@/Helpers/UserNameHelper';
import UserItemRow from './UserItemRow';

const SelectManagersScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<CreateAllocationStackParamTypes & AdminStackParamTypes>
    >();
  const { selectedManagers, toggleManager, isLoadingUsers, users } = useNewAllocationContext();

  const usersMap = useMemo(
    () =>
      users?.map((u, i) => ({
        key: u.userId || `${i}`,
        value: `${u.firstName} ${u.lastName}`,
        email: u.email!,
        initials: getUserInitials(u)!,
      })) || [],
    [users],
  );

  return (
    <AdminScreenWrapper
      title={t('adminFlows.createAllocation.selectManagersTitle')}
      text={t('adminFlows.createAllocation.selectManagersDescription')}
      onPrimaryAction={() => navigate(CreateAllocationScreens.SelectViewers)}
      primaryActionDisabled={selectedManagers.length === 0}
      onClose={() => navigate(AdminScreens.Allocations)}
    >
      <View style={tw`flex-1`}>
        {isLoadingUsers ? (
          <View style={tw`flex-1 items-center mt-16`}>
            <ActivityIndicator />
          </View>
        ) : (
          <AlphabetList
            showsVerticalScrollIndicator={false}
            indexContainerStyle={tw`mr-1.5`}
            indexLetterStyle={tw`text-xs text-secondary font-medium`}
            contentContainerStyle={tw`pb-6`}
            data={usersMap}
            renderCustomSectionHeader={() => <View />}
            renderCustomItem={(item: IData & { email?: string; initials?: string }) => (
              <UserItemRow
                userId={item.key}
                onPress={() => {
                  const manager = users?.find((x) => x.userId === item.key);
                  if (manager) toggleManager(manager);
                }}
                isSelected={selectedManagers.some((x) => x.userId === item.key)}
                name={item.value}
                email={item.email!}
                initials={item.initials!}
              />
            )}
          />
        )}
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
          style={tw`absolute bottom-0 left-0 right-0 h-16`}
          pointerEvents="none"
        />
      </View>
    </AdminScreenWrapper>
  );
};

export default SelectManagersScreen;
