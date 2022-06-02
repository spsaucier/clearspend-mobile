import isEmpty from 'lodash/isEmpty';
import { IssueCardRequest } from '@/generated/capital';
import {
  DefaultProps as IssueCardRequestProps,
  CardType,
} from '@/Services/Admin/IssueCardProvider';

export const validateIssueCardRequest = ({
  selectedCardType: cardType,
  selectedUser: user,
  selectedAddress: shippingAddress,
  selectedAllocationId: allocationId,
  selectedIsPersonal: isPersonal,
  selectedSpendControls: spendControls,
}: IssueCardRequestProps): IssueCardRequest | undefined => {
  if (!cardType || !user?.userId || !allocationId) return undefined;
  if (cardType === CardType.Physical && isEmpty(shippingAddress)) return undefined;

  return {
    allocationId,
    userId: user.userId,
    currency: 'USD',
    cardType: [cardType],
    isPersonal: !!isPersonal,
    ...(shippingAddress ? { shippingAddress: { ...shippingAddress, country: 'USA' } } : {}),
    // TODO support multiple allocations/spend controls on cards
    // @ts-expect-error
    limits: spendControls?.limits || [
      {
        currency: 'USD',
        typeMap: {
          PURCHASE: {},
        },
      },
    ],
    // @ts-expect-error
    disabledMccGroups: spendControls?.disabledMccGroups || [],
    // @ts-expect-error
    disabledPaymentTypes: spendControls?.disabledPaymentTypes || [],
    // @ts-expect-error
    disableForeign: spendControls?.disableForeign || false,
  };
};
