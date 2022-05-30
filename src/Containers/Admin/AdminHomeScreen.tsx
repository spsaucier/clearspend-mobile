import React, { useState } from 'react';
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
import { TransactionsContainer } from '@/Containers/Wallet/TransactionsContainer';
import { getNormalizedSnapPoint } from '@/Helpers/LayoutHelpers';

const AdminHomeScreen = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<AdminStackParamTypes, AdminScreens.Home>>();
  const { t } = useTranslation();
  const { data: user } = useUser();

  // default render values are based on 390 (iPhone 13) device width
  const [headerHeight, setHeaderHeight] = useState(116);
  const [tabsHeight, setTabsHeight] = useState(35);
  const [actionsHeight, setActionsHeight] = useState(175);

  const initialSnapPoint = getNormalizedSnapPoint() - headerHeight - tabsHeight - actionsHeight;

  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['top']}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={tw`flex-1`}>
        <View style={tw`px-5`} onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}>
          <View style={tw`py-5`}>
            <BackButtonNavigator theme="light" />
          </View>
          {user?.firstName && (
            <View style={tw`mb-6`}>
              <Text style={tw`text-xl`}>
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
            </View>
          )}
        </View>
        <ActionsAndRequestsTabs onLayout={(e) => setTabsHeight(e.nativeEvent.layout.height)}>
          {({ selectedTab }) =>
            selectedTab === AdminTab.Actions ? (
              <>
                <View
                  style={tw`px-5`}
                  onLayout={(e) => setActionsHeight(e.nativeEvent.layout.height)}
                >
                  <AdminActions
                    onEmployeesPress={() => navigate(AdminScreens.Employees)}
                    onAllocationsPress={() => navigate(AdminScreens.Allocations)}
                  />
                </View>
                <TransactionsContainer
                  initialSnapPoint={initialSnapPoint}
                  animateOnMount={false}
                  isAdmin
                  title={t('admin.transactionsTitle')}
                />
              </>
            ) : (
              <View style={tw`flex-1 px-5`}>
                <RequestsScreen />
              </View>
            )
          }
        </ActionsAndRequestsTabs>
      </View>
    </SafeAreaView>
  );
};

export default AdminHomeScreen;
