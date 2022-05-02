import React from 'react';
import { View, TouchableOpacity, Image, ImageProps } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import AdminScreenWrapper from '@/Containers/Admin/Components/AdminScreenWrapper';
import { IssueCardStackParamTypes, IssueCardScreens } from '@/Navigators/Admin/AdminNavigatorTypes';
import { useIssueCardContext } from '@/Hooks/useIssueCardContext';
import { CSText as Text } from '@/Components';
import { CardType } from '@/Services/Admin/IssueCardProvider';
import { CheckMarkIcon } from '@/Components/Icons';

const cardOptionPhysicalImage = require('@/Assets/Images/card-option-physical.png');
const cardOptionVirtualImage = require('@/Assets/Images/card-option-virtual.png');

interface CardOptionProps {
  testID: string;
  label: string;
  text: string;
  cardType: CardType;
  onSelect: (cardType: CardType) => void;
  isSelected: boolean;
  image: ImageProps;
}

const CardOption = ({
  testID,
  label,
  text,
  cardType,
  onSelect,
  isSelected,
  image,
}: CardOptionProps) => (
  <TouchableOpacity
    testID={testID}
    style={tw`flex-row justify-between items-center py-3`}
    onPress={() => onSelect(cardType)}
  >
    <View style={tw`flex-row items-center`}>
      <View>
        <Image source={image} />
      </View>
      <View style={tw`ml-4`}>
        <Text style={tw`text-sm text-black mb-1`}>{label}</Text>
        <Text style={tw`text-sm text-gray-50`}>{text}</Text>
      </View>
    </View>
    {isSelected && (
      <CheckMarkIcon testID="check-mark-icon" style={tw`w-4 mr-2`} color={tw.color('black')} />
    )}
  </TouchableOpacity>
);

const CardTypeScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<StackNavigationProp<IssueCardStackParamTypes, IssueCardScreens.CardType>>();
  const { selectedCardTypes, setSelectedCardTypes } = useIssueCardContext();

  const onSelectCardType = (cardType: CardType) => {
    const i = selectedCardTypes.indexOf(cardType);
    const cardTypes =
      i > -1
        ? [...selectedCardTypes.splice(0, i), ...selectedCardTypes.splice(i + 1)] // already exists -> toggle 'remove'
        : [...selectedCardTypes, cardType]; // does not exist -> toggle 'add'

    setSelectedCardTypes(cardTypes);
  };

  return (
    <AdminScreenWrapper
      testID="issue-card-card-type"
      title={t('adminFlows.issueCard.cardTypeTitle')}
      text={t('adminFlows.issueCard.cardTypeText')}
      onPrimaryAction={() => {
        navigate(IssueCardScreens.Employee);
      }}
      primaryActionDisabled={selectedCardTypes.length === 0}
    >
      <View>
        <CardOption
          testID="physical-card-option"
          label={t('adminFlows.issueCard.cardTypeOptionPhysicalLabel')}
          text={t('adminFlows.issueCard.cardTypeOptionPhysicalText')}
          image={cardOptionPhysicalImage}
          cardType={CardType.Physical}
          onSelect={onSelectCardType}
          isSelected={selectedCardTypes.includes(CardType.Physical)}
        />
        <CardOption
          testID="virtual-card-option"
          label={t('adminFlows.issueCard.cardTypeOptionVirtualLabel')}
          text={t('adminFlows.issueCard.cardTypeOptionVirtualText')}
          image={cardOptionVirtualImage}
          cardType={CardType.Virtual}
          onSelect={onSelectCardType}
          isSelected={selectedCardTypes.includes(CardType.Virtual)}
        />
      </View>
    </AdminScreenWrapper>
  );
};

export default CardTypeScreen;
