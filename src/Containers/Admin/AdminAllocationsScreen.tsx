import React, { useMemo, useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
// import { useNavigation } from '@react-navigation/core';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import tw from '@/Styles/tailwind';
import { useAllPermissions } from '@/Queries/permissions';
import { CSText as Text, FocusAwareStatusBar, Button } from '@/Components';
import { ActivityIndicator } from '@/Components/ActivityIndicator';
import { PlusCircleFilledIcon } from '@/Components/Icons';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
import { generateAllocationTree } from '@/Helpers/AllocationHelpers';
import { canManagePermissions } from '@/Helpers/PermissionsHelpers';
import AllocationTree from '@/Containers/Admin/Components/AllocationTree';
// import { AdminStackParamTypes, AdminScreens } from '@/Navigators/Admin/AdminNavigatorTypes';

const AdminAllocationsScreen = () => {
  // const { navigate } =
  //   useNavigation<NativeStackNavigationProp<AdminStackParamTypes, AdminScreens.Allocations>>();
  const { t } = useTranslation();
  const { data, isLoading } = useAllPermissions();
  const [selectedAllocationId, setSelectedAllocationId] = useState<string | undefined>();
  const allocations = useMemo(() => generateAllocationTree(data?.allocations), [data]);

  const onSelectAllocation = (allocationId: string) => {
    const permission = data?.userRoles?.find((a) => a.allocationId === allocationId);

    if (permission && canManagePermissions(permission)) {
      setSelectedAllocationId(allocationId);
    }
  };

  return (
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
                <AllocationTree
                  allocations={allocations}
                  onSelectAllocation={onSelectAllocation}
                  selectedAllocationId={selectedAllocationId}
                />
              </ScrollView>
              <View style={tw`mt-auto p-5`}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
                  style={tw`absolute -top-32 left-0 right-0 h-32`}
                />
                <Button
                  testID="manage-allocation-button"
                  label="Manage allocation"
                  onPress={() => {}}
                  disabled={!selectedAllocationId}
                />
              </View>
            </>
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default AdminAllocationsScreen;
