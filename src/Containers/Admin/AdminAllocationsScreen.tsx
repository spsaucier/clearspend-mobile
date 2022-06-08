import React, { useMemo, useState, useRef } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import tw from '@/Styles/tailwind';
import { useAllPermissions } from '@/Queries/permissions';
import { useUser } from '@/Queries/user';
import { CSText as Text, FocusAwareStatusBar, Button } from '@/Components';
import { ActivityIndicator } from '@/Components/ActivityIndicator';
import {
  PlusCircleFilledIcon,
  // CardIcon,
  PlusIcon,
  MinusIcon,
  // PlusMinusIcon,
} from '@/Components/Icons';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
import { generateAllocationTree, getManageableAllocations } from '@/Helpers/AllocationHelpers';
import AllocationTree from '@/Containers/Admin/Components/AllocationTree';
import OptionsBottomSheet from '@/Components/OptionsBottomSheet';
import OptionsBottomSheetButton from '@/Components/OptionsBottomSheetButton';
import { AdminStackParamTypes, AdminScreens } from '@/Navigators/Admin/AdminNavigatorTypes';
import { ReallocationType } from '@/Services/Admin/ManageAllocationProvider';
import useBankAccounts from '@/Hooks/useBankAccounts';

const AdminAllocationsScreen = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<AdminStackParamTypes, AdminScreens.Allocations>>();
  const { t } = useTranslation();
  const { data, isLoading } = useAllPermissions();
  const [allocationId, setAllocationId] = useState<string | undefined>();
  const allocations = useMemo(
    () => generateAllocationTree(getManageableAllocations('MANAGE_FUNDS', data)),
    [data],
  );
  const { data: user } = useUser();
  const { data: bankAccounts } = useBankAccounts({
    userType: user?.type,
  });

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const onEmployeesPress = () => {
    bottomSheetRef?.current?.present();
  };

  const onReallocateFunds = (reallocationType: ReallocationType) => {
    if (!allocationId || !data?.allocations || !data?.userRoles || !user?.type) return;

    navigate(AdminScreens.ManageAllocation, {
      allocationId,
      reallocationType,
      allocations: data?.allocations,
      userRoles: data?.userRoles,
      userType: user.type,
    });
  };

  // enable reallocate options (add/remove funds) if there's more than 1 allocation
  // or there's a bank accounts connected (business owner only)
  const enableReallocateOptions =
    (data?.allocations?.length || 0) > 1 || (bankAccounts?.length || 0) > 0;

  return (
    <BottomSheetModalProvider>
      <SafeAreaView testID="admin-allocations-screen" style={tw`flex-1 bg-white`}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <View style={tw`flex-row items-center p-5`}>
          <BackButtonNavigator theme="light" />
          <Text style={tw`ml-3`}>{t('admin.allocations.allocationsTitle')}</Text>
          <TouchableOpacity
            onPress={() => {} /* navigate(AdminScreens.AddEmployee) */}
            style={tw`flex-row justify-center items-center py-1.5 px-2 rounded-full bg-tan ml-auto`}
          >
            <PlusCircleFilledIcon />
            <Text style={tw`ml-1.5 text-secondary text-sm`}>
              {t('admin.allocations.newAllocation')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex-1`}>
          {isLoading ? (
            <View style={tw`flex-1 items-center justify-center my-6`}>
              <ActivityIndicator />
            </View>
          ) : (
            !!allocations?.length && (
              <>
                <ScrollView style={tw`px-5`}>
                  <View style={tw`pb-32`}>
                    <AllocationTree
                      allocations={allocations}
                      onSelectAllocation={setAllocationId}
                      selectedAllocationId={allocationId}
                    />
                  </View>
                </ScrollView>
                <View style={tw`mt-auto p-5`}>
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
                    style={tw`absolute -top-32 left-0 right-0 h-32`}
                    pointerEvents="none"
                  />
                  <Button
                    testID="manage-allocation-button"
                    label={t('admin.allocations.allocationOptions')}
                    onPress={onEmployeesPress}
                    disabled={!allocationId}
                  />
                </View>
              </>
            )
          )}
        </View>
      </SafeAreaView>
      <OptionsBottomSheet ref={bottomSheetRef} title={t('admin.allocations.allocationOptions')}>
        <OptionsBottomSheetButton
          testID="add-funds-button"
          text={t('admin.allocations.addFunds')}
          onPress={() => onReallocateFunds(ReallocationType.Add)}
          icon={PlusIcon}
          disabled={!enableReallocateOptions}
        />
        <OptionsBottomSheetButton
          testID="remove-funds-button"
          text={t('admin.allocations.removeFunds')}
          onPress={() => onReallocateFunds(ReallocationType.Remove)}
          icon={MinusIcon}
          disabled={!enableReallocateOptions}
        />
        {/* <OptionsBottomSheetButton
          text={t('admin.allocations.editSpendControls')}
          onPress={() => {}}
          icon={PlusMinusIcon}
        />
        <OptionsBottomSheetButton
          text={t('admin.allocations.viewCards')}
          onPress={() => {}}
          icon={CardIcon}
        /> */}
      </OptionsBottomSheet>
    </BottomSheetModalProvider>
  );
};

export default AdminAllocationsScreen;
