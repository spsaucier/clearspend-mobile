import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { AlphabetList, IData } from 'react-native-section-alphabet-list';
import { xor } from 'lodash';

import {
  AdminScreens,
  AdminStackParamTypes,
  CreateAllocationScreens,
  CreateAllocationStackParamTypes,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import AdminScreenWrapper from '../Components/AdminScreenWrapper';
import { useNewAllocationContext } from '@/Hooks/useNewAllocationContext';
import { ActivityIndicator } from '@/Components';
import tw from '@/Styles/tailwind';
import { getUserInitials } from '@/Helpers/UserNameHelper';
import UserItemRow from './UserItemRow';
import FadeOutGradient from '@/Components/FadeOutGradient';

const SelectViewersScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<CreateAllocationStackParamTypes & AdminStackParamTypes>
    >();
  const { selectedViewers, selectedManagers, toggleViewers, users, isLoadingUsers } =
    useNewAllocationContext();

  const usersNonManagers = xor(users, selectedManagers);

  const usersMap = useMemo(
    () =>
      usersNonManagers?.map((u, i) => ({
        key: u.userId || `${i}`,
        value: `${u.firstName} ${u.lastName}`,
        email: u.email,
        initials: getUserInitials(u),
      })) || [],
    [usersNonManagers],
  );

  return (
    <AdminScreenWrapper
      title={t('adminFlows.createAllocation.selectViewersTitle')}
      text={t('adminFlows.createAllocation.selectViewersDescription')}
      onPrimaryAction={() => navigate(CreateAllocationScreens.ConfirmDetails)}
      primaryActionDisabled={selectedViewers.length === 0}
      onClose={() => navigate(AdminScreens.Allocations)}
      edges={['top']}
    >
      <View style={tw`flex-1`}>
        {isLoadingUsers ? (
          <View style={tw`flex-1 items-center mt-16`}>
            <ActivityIndicator />
          </View>
        ) : (
          <AlphabetList
            showsVerticalScrollIndicator={false}
            indexContainerStyle={tw`w-10`}
            indexLetterStyle={tw`text-xs text-secondary font-medium `}
            contentContainerStyle={tw`pb-6`}
            data={usersMap}
            renderCustomSectionHeader={() => <View />}
            renderCustomItem={(item: IData & { email?: string; initials?: string }) => (
              <UserItemRow
                userId={item.key}
                onPress={() => {
                  const viewer = usersNonManagers.find((x) => x.userId === item.key);
                  if (viewer) toggleViewers(viewer);
                }}
                isSelected={selectedViewers.some((x) => x.userId === item.key)}
                name={item.value}
                email={item.email!}
                initials={item.initials!}
              />
            )}
          />
        )}
        <FadeOutGradient />
      </View>
    </AdminScreenWrapper>
  );
};

export default SelectViewersScreen;
