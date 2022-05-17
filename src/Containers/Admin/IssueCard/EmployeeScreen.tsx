import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import AdminScreenWrapper from '@/Containers/Admin/Components/AdminScreenWrapper';
import { IssueCardStackParamTypes, IssueCardScreens } from '@/Navigators/Admin/AdminNavigatorTypes';
import { useIssueCardContext } from '@/Hooks/useIssueCardContext';
import { useUsers } from '@/Queries/user';
import { CSText as Text, ActivityIndicator } from '@/Components';
import { CheckMarkIcon } from '@/Components/Icons';
import { CardType } from '@/Services/Admin/IssueCardProvider';

const EmployeeScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<IssueCardStackParamTypes, IssueCardScreens.Employee>>();
  const { isLoading, data: users } = useUsers();
  const { selectedUser, setSelectedUser, selectedCardType } = useIssueCardContext();

  return (
    <AdminScreenWrapper
      testID="issue-card-employee"
      title={t('adminFlows.issueCard.employeeTitle')}
      onPrimaryAction={() => {
        if (selectedCardType === CardType.Physical) {
          navigate(IssueCardScreens.CardDetails);
        } else {
          navigate(IssueCardScreens.Allocation);
        }
      }}
      primaryActionDisabled={!selectedUser}
    >
      {isLoading ? (
        <View style={tw`flex-1 items-center mt-16`}>
          <ActivityIndicator />
        </View>
      ) : (
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
              <View
                style={tw`flex-row justify-center items-center w-10 h-10 rounded-full bg-black`}
              >
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
                  <CheckMarkIcon
                    testID="check-mark-icon"
                    style={tw`w-4`}
                    color={tw.color('black')}
                  />
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </AdminScreenWrapper>
  );
};

export default EmployeeScreen;
