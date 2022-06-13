import React from 'react';
import { KeyboardAvoidingView, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from '@/Styles/tailwind';
import {
  AdminStackParamTypes,
  AdminScreens,
  CreateEmployeeStackParamTypes,
  CreateEmployeeScreens,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import AdminScreenWrapper from '@/Containers/Admin/Components/AdminScreenWrapper';
import { useCreateEmployeeContext } from '@/Hooks/useCreateEmployeeContext';

const EmployeeFirstNameScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<
        CreateEmployeeStackParamTypes & AdminStackParamTypes,
        CreateEmployeeScreens.EmployeeFirstName
      >
    >();

  const { firstName, setFirstName } = useCreateEmployeeContext();

  const onSubmit = () => firstName && navigate(CreateEmployeeScreens.EmployeeLastName);

  return (
    <KeyboardAvoidingView
      testID="create-employee-employee-first-name-screen"
      behavior="padding"
      style={tw`flex-1`}
    >
      <AdminScreenWrapper
        title={t('adminFlows.createEmployee.employeeFirstName')}
        onPrimaryAction={onSubmit}
        onPrimaryActionLabel={t('adminFlows.continueCta')}
        onClose={() => navigate(AdminScreens.Employees)}
        primaryActionDisabled={!firstName}
      >
        <View style={tw`flex-row items-center mb-8`}>
          <TextInput
            testID="create-employee-first-name-input"
            style={tw`py-2 bg-white text-2xl font-telegraf font-light flex-grow-1`}
            value={firstName}
            onChangeText={setFirstName}
            onSubmitEditing={onSubmit}
            autoFocus
          />
        </View>
      </AdminScreenWrapper>
    </KeyboardAvoidingView>
  );
};

export default EmployeeFirstNameScreen;
