import React from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation, Trans } from 'react-i18next';
import tw from '@/Styles/tailwind';
import AdminScreenWrapper from '@/Containers/Admin/Components/AdminScreenWrapper';
import { IssueCardStackParamTypes, IssueCardScreens } from '@/Navigators/Admin/AdminNavigatorTypes';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { useIssueCardContext } from '@/Hooks/useIssueCardContext';
import { CSText as Text } from '@/Components';
import { CardType } from '@/Services/Admin/IssueCardProvider';

const cardPhysicalImage = require('@/Assets/Images/card-physical.png');
const cardVirtualImage = require('@/Assets/Images/card-virtual.png');

const CardConfirmationScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<
      StackNavigationProp<IssueCardStackParamTypes, IssueCardScreens.CardConfirmation>
    >();
  const {
    selectedUser: user,
    selectedCardType: cardType,
    selectedAddress: address,
    resetSelections,
  } = useIssueCardContext();

  return (
    <AdminScreenWrapper
      testID="issue-card-card-confirmation"
      onPrimaryAction={() => {
        resetSelections();
        navigate(MainScreens.Wallet);
      }}
      onPrimaryActionLabel={t('adminFlows.issueCard.confirmationPrimaryActionCta')}
      onSecondaryAction={() => {
        resetSelections();
        navigate(IssueCardScreens.CardType);
      }}
      onSecondaryActionLabel={t('adminFlows.issueCard.confirmationSecondaryActionCta')}
      hideBackButton
    >
      <View>
        <View style={[tw`mt-12 rounded-xl overflow-hidden`]}>
          <Image
            testID={cardType === CardType.Physical ? 'card-physical-image' : 'card-virtual-image'}
            source={cardType === CardType.Physical ? cardPhysicalImage : cardVirtualImage}
            style={[tw`w-full h-auto`, { aspectRatio: 335 / 211 }]}
          />
        </View>
        <View>
          <Text style={tw`font-telegraf text-2xl font-light text-black mt-10`}>
            {t('adminFlows.issueCard.cardConfirmationTitle')}
          </Text>
          <Text style={tw`text-sm mt-5 leading-6`}>
            {cardType === CardType.Physical ? (
              <Text testID="card-physical-text">
                <Trans
                  i18nKey={t('adminFlows.issueCard.confirmationPhysicalCard', {
                    name: `${user?.firstName} ${user?.lastName}`,
                    address: `${address?.streetLine1} ${
                      address?.streetLine2 ? `, ${address.streetLine2}` : ''
                    }${address?.locality}, ${address?.region} ${address?.postalCode}`,
                    interpolation: { escapeValue: false },
                  })}
                  components={{
                    key1: <Text style={tw`text-sm font-semibold`} />,
                    key2: <Text style={tw`text-sm font-semibold`} />,
                  }}
                />
              </Text>
            ) : (
              <Text testID="card-virtual-text">
                <Trans
                  i18nKey={t('adminFlows.issueCard.confirmationVirtualCard', {
                    name: `${user?.firstName} ${user?.lastName}`,
                    interpolation: { escapeValue: false },
                  })}
                  components={{
                    key1: <Text style={tw`text-sm font-semibold`} />,
                  }}
                />
              </Text>
            )}
          </Text>
        </View>
      </View>
    </AdminScreenWrapper>
  );
};

export default CardConfirmationScreen;
