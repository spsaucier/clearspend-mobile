import { generateAllocationTree } from '../AllocationHelpers';
import { adminResponse, managerResponse } from '@/Helpers/testing/fixtures/allocations';

describe('generateAllocationTree', () => {
  it('groups parent and children allocations (admin response)', () => {
    const tree = generateAllocationTree(adminResponse);

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
