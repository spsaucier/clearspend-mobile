import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import AdminScreenWrapper from '@/Containers/Admin/Components/AdminScreenWrapper';
import { IssueCardStackParamTypes, IssueCardScreens } from '@/Navigators/Admin/AdminNavigatorTypes';
import { useIssueCardContext } from '@/Hooks/useIssueCardContext';
import { useUsers } from '@/Queries/user';
import { CSText as Text } from '@/Components';
import { CheckMarkIcon } from '@/Components/Icons';
import { CardType } from '@/Services/Admin/IssueCardProvider';

const EmployeeScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<StackNavigationProp<IssueCardStackParamTypes, IssueCardScreens.Employee>>();
  const { data: users } = useUsers();
  const { selectedUser, setSelectedUser, selectedCardTypes } = useIssueCardContext();

  return (
    <AdminScreenWrapper
      testID="issue-card-employee"
      title={t('adminFlows.issueCard.employeeTitle')}
      onPrimaryAction={() => {
        if (selectedCardTypes.includes(CardType.Physical)) {
          navigate(IssueCardScreens.CardDetails);
        } else {
          navigate(IssueCardScreens.Allocation);
        }
      }}
      primaryActionDisabled={!selectedUser}
    >
      <FlatList
        nestedScrollEnabled
        data={users}
        keyExtractor={(item) => item.userId!}
        renderItem={({ item }) => (
          <TouchableOpacity
            testID={item.userId}
            style={tw`flex-row py-3`}
            onPress={() => setSelectedUser(item)}
          >
            <View style={tw`flex-row justify-center items-center w-10 h-10 rounded-full bg-black`}>
              <Text allowFontScaling={false} style={tw`text-white`}>
                {item.firstName?.[0]}
              </Text>
              <Text allowFontScaling={false} style={tw`text-white`}>
                {item.lastName?.[0]}
              </Text>
            </View>
            <View style={tw`mx-4 flex-shrink-1`}>
              <Text style={tw`mb-1`}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={tw`text-sm text-gray-50`} numberOfLines={1}>
                {item.email}
              </Text>
            </View>
            <View style={tw`flex justify-center items-center w-10 h-10`}>
              {item.userId === selectedUser?.userId && (
                <CheckMarkIcon testID="check-mark-icon" style={tw`w-4`} color={tw.color('black')} />
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </AdminScreenWrapper>
  );
};

export default EmployeeScreen;