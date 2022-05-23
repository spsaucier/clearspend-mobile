import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation, Trans } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from '@/Styles/tailwind';
import { CSText as Text, FocusAwareStatusBar } from '@/Components';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
import { AdminStackParamTypes, AdminScreens } from '@/Navigators/Admin/AdminNavigatorTypes';
import { useUser } from '@/Queries/user';
import ActionsAndRequestsTabs, {
  AdminTab,
} from '@/Containers/Admin/Components/ActionsAndRequestsTabs';
import AdminActions from '@/Containers/Admin/Dashboard/AdminActions';
import RequestsScreen from './RequestsScreen';

const AdminHomeScreen = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<AdminStackParamTypes, AdminScreens.Home>>();
  const { t } = useTranslation();
  const { data: user } = useUser();

  const requestsText = '4 new admin requests since last time'; // TODO: Update

  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['top']}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={tw`p-5`}>
        <BackButtonNavigator theme="light" />
      </View>
      <View style={tw`flex-1`}>
        <View style={tw`px-5`}>
          {user?.firstName && (
            <Text style={tw`text-xl mb-1.5`}>
              <Trans
                i18nKey={t('admin.welcome', {
                  name: user.firstName,
                  interpolation: { escapeValue: false },
                })}
                components={{
                  key1: <Text style={tw`text-xl font-semibold`} />,
                }}
              />
            </Text>
          )}
          {requestsText && <Text>{requestsText}</Text>}
        </View>
        <ActionsAndRequestsTabs style={tw`mt-6 px-5 flex-1`}>
          {({ selectedTab }) =>
            selectedTab === AdminTab.Actions ? (
              <AdminActions
                onEmployeesPress={() => navigate(AdminScreens.Employees)}
                onAllocationsPress={() => navigate(AdminScreens.Allocations)}
              />
            ) : (
              <RequestsScreen />
            )
          }
        </ActionsAndRequestsTabs>
      </View>
    </SafeAreaView>
  );
};

export default AdminHomeScreen;
