import React from 'react';
import { View, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/core';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from '@/Styles/tailwind';
import {
  AdminStackParamTypes,
  AdminScreens,
  CreateEmployeeStackParamTypes,
  CreateEmployeeScreens,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import AdminScreenWrapper from '@/Containers/Admin/Components/AdminScreenWrapper';
import { CSText as Text } from '@/Components/Text';
import { useUserById } from '@/Queries/user';

const cardPhysicalImage = require('@/Assets/Images/card-physical.png');

type NavProps = NativeStackNavigationProp<
  CreateEmployeeStackParamTypes & AdminStackParamTypes,
  CreateEmployeeScreens.EmployeeConfirmation
>;

type RouteProps = RouteProp<
  CreateEmployeeStackParamTypes & AdminStackParamTypes,
  CreateEmployeeScreens.EmployeeConfirmation
>;

const EmployeeConfirmationScreen = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavProps>();
  const { params } = useRoute<RouteProps>();

  const { data: user } = useUserById(params.userId);

  return (
    <AdminScreenWrapper
      testID="create-employee-employee-confirmation-screen"
      onPrimaryAction={() => user && navigate(AdminScreens.IssueCard, { user })}
      onPrimaryActionLabel={t('adminFlows.createEmployee.employeeConfirmationPrimaryActionCta')}
      primaryActionDisabled={!user}
      onSecondaryAction={() => navigate(AdminScreens.Employees)}
      onSecondaryActionLabel={t('adminFlows.createEmployee.employeeConfirmationSecondaryActionCta')}
      hideBackButton
    >
      <View>
        <View style={[tw`mt-12 rounded-xl overflow-hidden`]}>
          <Image
            source={cardPhysicalImage}
            style={[tw`w-full h-auto`, { aspectRatio: 335 / 211 }]}
          />
        </View>
        <View>
          <Text style={tw`font-telegraf text-2xl font-light text-black mt-10`}>
            {t('adminFlows.createEmployee.employeeConfirmationTitle')}
          </Text>
          <Text style={tw`text-sm mt-5 leading-6`}>
            {t('adminFlows.createEmployee.employeeConfirmationText')}
          </Text>
        </View>
      </View>
    </AdminScreenWrapper>
  );
};

export default EmployeeConfirmationScreen;
