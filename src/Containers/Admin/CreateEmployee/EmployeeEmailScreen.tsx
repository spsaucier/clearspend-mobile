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
import { EMAIL_REGEX } from '@/Helpers/StringHelpers';

const EmployeeEmailScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<
        CreateEmployeeStackParamTypes & AdminStackParamTypes,
        CreateEmployeeScreens.EmployeeEmail
      >
    >();

  const { email, setEmail } = useCreateEmployeeContext();
  const isValidEmail = email && EMAIL_REGEX.test(email);

  const onSubmit = () => isValidEmail && navigate(CreateEmployeeScreens.EmployeeCreateRequest);

  return (
    <KeyboardAvoidingView
      testID="create-employee-employee-email-screen"
      behavior="padding"
      style={tw`flex-1`}
    >
      <AdminScreenWrapper
        title={t('adminFlows.createEmployee.employeeEmail')}
        onPrimaryAction={onSubmit}
        onPrimaryActionLabel={t('adminFlows.createEmployee.submitCta')}
        onClose={() => navigate(AdminScreens.Employees)}
        primaryActionDisabled={!isValidEmail}
      >
        <View style={tw`flex-row items-center mb-8`}>
          <TextInput
            testID="create-employee-first-name-input"
            style={tw`py-2 bg-white text-2xl font-telegraf font-light flex-grow-1`}
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={onSubmit}
            keyboardType="email-address"
            autoCapitalize="none"
            autoFocus
          />
        </View>
      </AdminScreenWrapper>
    </KeyboardAvoidingView>
  );
};

export default EmployeeEmailScreen;
