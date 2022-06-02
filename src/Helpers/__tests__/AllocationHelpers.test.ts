import { AllocationsAndPermissionsResponse } from '@/generated/capital';
import { generateAllocationTree, getManageableAllocations } from '../AllocationHelpers';
import {
  adminResponse,
  managerResponse,
  mixedResponse,
} from '@/Helpers/testing/fixtures/allocations';

describe('generateAllocationTree', () => {
  it('groups parent and children allocations (admin response)', () => {
    const tree = generateAllocationTree(adminResponse.allocations);

    expect(tree[0].name).toBe('Dovetail');

    expect(tree[0].children![0].name).toBe('Breakfast');

    expect(tree[0].children![1].name).toBe('IT');
    expect(tree[0].children![1].children![0].name).toBe('Lunch');
    expect(tree[0].children![1].children![0].children![0].name).toBe('Barkfeast');
    expect(tree[0].children![1].children![0].children![1].name).toBe('Dinner');

    expect(tree[0].children![2].name).toBe('Marketing');
    expect(tree[0].children![2].children![0].name).toBe('Q2 2022');
    expect(tree[0].children![2].children![1].name).toBe('Permissions');
  });

  it('groups parent and children allocations (manager response)', () => {
    const tree = generateAllocationTree(managerResponse);

    expect(tree[0].name).toBe('Smaller Business Inc');
    expect(tree[1].name).toBe('Another Smaller Business Inc');

    expect(tree[0].children![0].name).toBe('Tiny Business Ltd');
    expect(tree[1].children![0].name).toBe('Another Tiny Business Ltd');
  });
});

describe('getManageableAllocations', () => {
  it('only returns allocations that have the `MANAGE_CARDS` permission', () => {
    expect(
      getManageableAllocations('MANAGE_CARDS', mixedResponse as AllocationsAndPermissionsResponse),
    ).toStrictEqual([
      {
        account: {
          accountId: 'e29dc8df-b2de-40fa-afa0-eeba9101db9b',
          allocationId: 'd998c97b-02e0-4dd1-873d-0d3142b4b0a3',
          availableBalance: { amount: 955, currency: 'USD' },
          businessId: '1e7e106b-4177-47aa-a8d6-e4cf5ae26157',
          cardId: undefined,
          ledgerAccountId: '8874f7d9-0d3b-4650-8fb5-4816a81d397a',
          ledgerBalance: { amount: 955, currency: 'USD' },
          type: 'ALLOCATION',
        },
        allocationId: 'd998c97b-02e0-4dd1-873d-0d3142b4b0a3',
        childrenAllocationIds: [],
        name: 'Marketing',
        parentAllocationId: 'b6db6a57-1118-4b15-a1ea-c79fef63b3ae',
      },
    ]);
  });
});
