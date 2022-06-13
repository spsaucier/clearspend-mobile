import isEmpty from 'lodash/isEmpty';
import {
  IssueCardRequest,
  BusinessReallocationRequest,
  TransactBankAccountRequest,
  CreateUserRequest,
} from '@/generated/capital';
import {
  DefaultProps as IssueCardRequestProps,
  CardType,
} from '@/Services/Admin/IssueCardProvider';
import {
  DefaultProps as ManageAllocationRequestProps,
  ReallocationType,
} from '@/Services/Admin/ManageAllocationProvider';
import { DefaultProps as CreateEmployeeRequestProps } from '@/Services/Admin/CreateEmployeeProvider';
import { validateAllocationAmount } from '@/Helpers/AllocationHelpers';
import { EMAIL_REGEX } from '@/Helpers/StringHelpers';

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

export const validateReallocationRequest = ({
  allocationId,
  targetAllocationId,
  reallocationType,
  amount,
}: ManageAllocationRequestProps): BusinessReallocationRequest | undefined => {
  if (!allocationId || !targetAllocationId) return undefined;

  const numericAmount = validateAllocationAmount(amount);

  if (!numericAmount) return undefined;

  const [allocationIdFrom, allocationIdTo] =
    reallocationType === ReallocationType.Add
      ? [targetAllocationId, allocationId]
      : [allocationId, targetAllocationId];

  return {
    allocationIdFrom,
    allocationIdTo,
    amount: {
      currency: 'USD',
      amount: numericAmount,
    },
  };
};

export const validateBankTransferRequest = ({
  reallocationType,
  amount,
}: Pick<ManageAllocationRequestProps, 'reallocationType' | 'amount'>):
  | TransactBankAccountRequest
  | undefined => {
  const numericAmount = validateAllocationAmount(amount);

  if (!numericAmount) return undefined;

  return {
    bankAccountTransactType: reallocationType === ReallocationType.Add ? 'DEPOSIT' : 'WITHDRAW',
    amount: {
      currency: 'USD',
      amount: numericAmount,
    },
  };
};

export const validateCreateEmployeeRequest = ({
  firstName,
  lastName,
  email,
}: CreateEmployeeRequestProps): CreateUserRequest | undefined => {
  if (!firstName || !lastName || !email || !EMAIL_REGEX.test(email || '')) return undefined;

  return {
    firstName,
    lastName,
    email,
  };
};
