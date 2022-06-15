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

const EmployeeLastNameScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<
        CreateEmployeeStackParamTypes & AdminStackParamTypes,
        CreateEmployeeScreens.EmployeeLastName
      >
    >();

  const { lastName, setLastName } = useCreateEmployeeContext();

  const onSubmit = () => lastName && navigate(CreateEmployeeScreens.EmployeeEmail);

  return (
    <KeyboardAvoidingView
      testID="create-employee-employee-last-name-screen"
      behavior="padding"
      style={tw`flex-1`}
    >
      <AdminScreenWrapper
        title={t('adminFlows.createEmployee.employeeLastName')}
        onPrimaryAction={onSubmit}
        onPrimaryActionLabel={t('adminFlows.continueCta')}
        onClose={() => navigate(AdminScreens.Employees)}
        primaryActionDisabled={!lastName}
        edges={['top']}
      >
        <View style={tw`flex-row items-center mb-8`}>
          <TextInput
            testID="create-employee-last-name-input"
            style={tw`py-2 bg-white text-2xl font-telegraf font-light flex-grow-1`}
            value={lastName}
            onChangeText={setLastName}
            onSubmitEditing={onSubmit}
            autoFocus
          />
        </View>
      </AdminScreenWrapper>
    </KeyboardAvoidingView>
  );
};

export default EmployeeLastNameScreen;
