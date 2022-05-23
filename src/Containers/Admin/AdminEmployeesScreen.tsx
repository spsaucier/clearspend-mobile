import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
// import { useNavigation } from '@react-navigation/core';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AlphabetList, IData } from 'react-native-section-alphabet-list';
import tw from '@/Styles/tailwind';
import { useUsers } from '@/Queries/user';
import { CSText as Text, FocusAwareStatusBar } from '@/Components';
import { ActivityIndicator } from '@/Components/ActivityIndicator';
import { PlusCircleFilledIcon } from '@/Components/Icons';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
// import { AdminStackParamTypes, AdminScreens } from '@/Navigators/Admin/AdminNavigatorTypes';

const AdminEmployeesScreen = () => {
  // const { navigate } =
  //   useNavigation<NativeStackNavigationProp<AdminStackParamTypes, AdminScreens.Employees>>();
  const { t } = useTranslation();
  const { isLoading, data } = useUsers();
  const users = useMemo(
    () =>
      data &&
      data.map((u, i) => ({
        key: u.userId || `${i}`,
        value: `${u.firstName} ${u.lastName}`,
        email: u.email,
        initials: `${u.firstName?.[0]} ${u.lastName?.[0]}`,
      })),
    [data],
  );

  return (
    <SafeAreaView testID="admin-employees-screen" style={tw`flex-1 bg-white`}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={tw`flex-row items-center p-5`}>
        <BackButtonNavigator theme="light" />
        <Text style={tw`ml-3`}>Employees</Text>
        <TouchableOpacity
          onPress={() => {} /* navigate(AdminScreens.AddEmployee) */}
          style={tw`flex-row justify-center items-center py-1.5 px-2 rounded-full bg-tan ml-auto`}
        >
          <PlusCircleFilledIcon />
          <Text style={tw`ml-1.5 text-secondary text-sm`}>{t('admin.employees.addEmployee')}</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex-1`}>
        {isLoading ? (
          <View style={tw`flex-1 items-center justify-center my-6`}>
            <ActivityIndicator />
          </View>
        ) : users?.length ? (
          <AlphabetList
            indexContainerStyle={tw`mr-1.5`}
            indexLetterStyle={tw`text-xs text-secondary font-medium`}
            data={users}
            renderCustomItem={(item: IData & { email?: string; initials?: string }) => (
              <TouchableOpacity style={tw`flex-row py-3 px-5`} onPress={() => {}}>
                <View
                  style={tw`flex-row justify-center items-center w-10 h-10 rounded-full bg-black`}
                >
                  <Text allowFontScaling={false} style={tw`text-white tracking-tighter text-base`}>
                    {item.initials}
                  </Text>
                </View>
                <View style={tw`mx-4 flex-shrink-1`}>
                  <Text style={tw`mb-1`}>{item.value}</Text>
                  <Text style={tw`text-sm text-gray-50`} numberOfLines={1}>
                    {item.email}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            renderCustomSectionHeader={() => <View />}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default AdminEmployeesScreen;
