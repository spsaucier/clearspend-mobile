import { validateIssueCardRequest } from '../RequestHelpers';
import { CardType } from '../../Services/Admin/IssueCardProvider';

describe('validateIssueCardRequest', () => {
  it('returns formatted request payload - Virtual', () => {
    const params = validateIssueCardRequest({
      selectedCardType: CardType.Virtual,
      selectedUser: {
        userId: 'user-123',
      },
      selectedIsPersonal: undefined,
      selectedAddress: undefined,
      selectedAllocationId: 'allocation-123',
      selectedSpendControls: undefined,
    });

    expect(params).toStrictEqual({
      allocationId: 'allocation-123',
      cardType: ['VIRTUAL'],
      currency: 'USD',
      disableForeign: false,
      disabledMccGroups: [],
      disabledPaymentTypes: [],
      isPersonal: false,
      limits: [{ currency: 'USD', typeMap: { PURCHASE: {} } }],
      userId: 'user-123',
    });
  });

  it('returns undefined if no `user` or `cardType` or `allocation` is passed - Virtual', () => {
    const params = validateIssueCardRequest({
      selectedIsPersonal: undefined,
      selectedAddress: undefined,
      selectedSpendControls: undefined,
    });

    expect(params).toBeUndefined();
  });

  it('returns formatted request payload - Physical', () => {
    const params = validateIssueCardRequest({
      selectedCardType: CardType.Physical,
      selectedUser: {
        userId: 'user-123',
      },
      selectedIsPersonal: true,
      selectedAddress: {
        streetLine1: '1640 GILSTRAP LN NW',
        streetLine2: '',
        locality: 'ATLANTA',
        region: 'GA',
        postalCode: '30318',
      },
      selectedAllocationId: 'allocation-123',
      selectedSpendControls: undefined,
    });

    expect(params).toStrictEqual({
      allocationId: 'allocation-123',
      cardType: ['PHYSICAL'],
      currency: 'USD',
      disableForeign: false,
      disabledMccGroups: [],
      disabledPaymentTypes: [],
      isPersonal: true,
      limits: [{ currency: 'USD', typeMap: { PURCHASE: {} } }],
      shippingAddress: {
        country: 'USA',
        locality: 'ATLANTA',
        postalCode: '30318',
        region: 'GA',
        streetLine1: '1640 GILSTRAP LN NW',
        streetLine2: '',
      },
      userId: 'user-123',
    });
  });

  it('returns undefined if no `address` is passed - Physical', () => {
    const params = validateIssueCardRequest({
      selectedCardType: CardType.Physical,
      selectedUser: {
        userId: 'user-123',
      },
      selectedIsPersonal: true,
      selectedAllocationId: 'allocation-123',
      selectedSpendControls: undefined,
    });

    expect(params).toBeUndefined();
  });
});
