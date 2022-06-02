import React from 'react';
import isEmpty from 'lodash';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Address } from 'generated/capital';
import tw from '@/Styles/tailwind';
import AdminScreenWrapper from '@/Containers/Admin/Components/AdminScreenWrapper';
import {
  IssueCardStackParamTypes,
  IssueCardScreens,
  AdminStackParamTypes,
  AdminScreens,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import { useIssueCardContext } from '@/Hooks/useIssueCardContext';
import { useBusiness } from '@/Queries/business';
import { CSText as Text } from '@/Components';
import { CheckMarkIcon, BusinessIcon, ProfileIcon, PlusIcon } from '@/Components/Icons';
import { IconBaseProps } from '@/Components/Icons/types';

interface AddressOptionProps {
  testID: string;
  icon: React.FC<IconBaseProps>;
  label: string;
  address?: Address | null;
  isSelected: boolean;
  onSelect: (address: Address | null | undefined) => void;
}

const AddressOption = ({
  testID,
  icon: Icon,
  label,
  address,
  isSelected,
  onSelect,
}: AddressOptionProps) => (
  <TouchableOpacity
    testID={testID}
    style={tw`flex-row items-center py-3`}
    onPress={() => onSelect(address)}
  >
    <View style={tw`flex items-center justify-center w-14 h-14 bg-tan`}>
      <Icon size={32} color={tw.color('black')} />
    </View>
    <View style={tw`mx-4 flex-shrink-1`}>
      <Text style={tw`text-sm mb-1`}>{label}</Text>
      {address && (
        <>
          <Text style={tw`text-sm text-gray-50`}>
            {address?.streetLine1}
            {address?.streetLine2 && `, ${address.streetLine2}`}
          </Text>
          <Text style={tw`text-sm text-gray-50`}>
            {address?.locality}, {address?.region} {address?.postalCode}
          </Text>
        </>
      )}
    </View>
    {isSelected && <CheckMarkIcon testID="check-mark-icon" style={tw`ml-auto mr-1`} />}
  </TouchableOpacity>
);

const AddressScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<
        IssueCardStackParamTypes & AdminStackParamTypes,
        IssueCardScreens.Address
      >
    >();
  const { selectedUser, selectedAddress, setSelectedAddress } = useIssueCardContext();
  const { data: business } = useBusiness();

  const isDuplicate = business?.address?.streetLine1 === selectedUser?.address?.streetLine1;

  return (
    <AdminScreenWrapper
      testID="issue-card-address"
      title={t('adminFlows.issueCard.addressTitle')}
      onPrimaryAction={() => {
        if (selectedAddress) {
          navigate(IssueCardScreens.Allocation);
        } else {
          navigate(IssueCardScreens.NewAddress);
        }
      }}
      primaryActionDisabled={selectedAddress === undefined} // null for 'new address'
      onClose={() => navigate(AdminScreens.Employees)}
    >
      {business?.address && (
        <AddressOption
          testID="business-address-option"
          icon={BusinessIcon}
          label={t('adminFlows.issueCard.addressBusinessOption')}
          address={business.address}
          isSelected={selectedAddress === business?.address}
          onSelect={setSelectedAddress}
        />
      )}
      {!isDuplicate && !isEmpty(selectedUser?.address) && (
        <AddressOption
          testID="employee-address-option"
          icon={ProfileIcon}
          label={t('adminFlows.issueCard.addressEmployeeOption')}
          address={selectedUser?.address}
          isSelected={selectedAddress === selectedUser?.address}
          onSelect={setSelectedAddress}
        />
      )}
      <AddressOption
        testID="new-address-option"
        icon={PlusIcon}
        label={t('adminFlows.issueCard.addressNewOption')}
        address={null}
        isSelected={selectedAddress === null}
        onSelect={setSelectedAddress}
      />
    </AdminScreenWrapper>
  );
};

export default AddressScreen;
