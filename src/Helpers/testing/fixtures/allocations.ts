const ADMIN_ALLOCATION_PERMISSIONS = [
  'READ',
  'CATEGORIZE',
  'LINK_RECEIPTS',
  'MANAGE_FUNDS',
  'MANAGE_CARDS',
  'MANAGE_USERS',
  'MANAGE_PERMISSIONS',
  'MANAGE_CONNECTIONS',
  'VIEW_OWN',
  'LINK_BANK_ACCOUNTS',
];

export const adminResponse = {
  userRoles: [
    {
      allocationId: '7a2ed2cd-f517-428e-8b3e-bf7e13b1bb51',
      allocationPermissions: ADMIN_ALLOCATION_PERMISSIONS,
    },
    {
      allocationId: '75b37d67-3852-4fda-aaf7-25bb594e83d9',
      allocationPermissions: ADMIN_ALLOCATION_PERMISSIONS,
    },
    {
      allocationId: '527b4e6c-a069-4d07-bd44-10fc04070f7d',
      allocationPermissions: ADMIN_ALLOCATION_PERMISSIONS,
    },
    {
      allocationId: '1d77bbeb-d765-43b8-a947-0d13e54cf871',
      allocationPermissions: ADMIN_ALLOCATION_PERMISSIONS,
    },
    {
      allocationId: 'aa469797-9b3b-46b5-8528-1312238c03d4',
      allocationPermissions: ADMIN_ALLOCATION_PERMISSIONS,
    },
    {
      allocationId: 'bdb01f17-5f1c-4e31-ad43-90fefb6e7954',
      allocationPermissions: ADMIN_ALLOCATION_PERMISSIONS,
    },
    {
      allocationId: '88243a69-b24f-4695-a70e-9089ca0998ce',
      allocationPermissions: ADMIN_ALLOCATION_PERMISSIONS,
    },
    {
      allocationId: 'c057f800-5920-4fda-a0db-14f7d3c454c4',
      allocationPermissions: ADMIN_ALLOCATION_PERMISSIONS,
    },
    {
      allocationId: '2587f140-93af-453a-904d-506eac12a53a',
      allocationPermissions: ADMIN_ALLOCATION_PERMISSIONS,
    },
  ],
  allocations: [
    {
      allocationId: '7a2ed2cd-f517-428e-8b3e-bf7e13b1bb51',
      name: 'Breakfast',
      account: {
        accountId: '577459a2-1948-48fa-a90f-916df2280e4f',
        businessId: '58022877-a122-47b8-8f78-7bdfbbba0e4d',
        allocationId: '7a2ed2cd-f517-428e-8b3e-bf7e13b1bb51',
        ledgerAccountId: 'db6798e2-c92e-430a-bcca-43f669d45387',
        type: 'ALLOCATION' as 'ALLOCATION',
        cardId: undefined,
        ledgerBalance: {
          currency: 'USD' as 'USD',
          amount: 200,
        },
        availableBalance: {
          currency: 'USD' as 'USD',
          amount: 200,
        },
      },
      ownerId: '',
      parentAllocationId: '1d77bbeb-d765-43b8-a947-0d13e54cf871',
      childrenAllocationIds: [],
    },
    {
      allocationId: '75b37d67-3852-4fda-aaf7-25bb594e83d9',
      name: 'Barkfeast',
      account: {
        accountId: '8f80b52c-ac78-45b6-9554-838d6a2e2f63',
        businessId: '58022877-a122-47b8-8f78-7bdfbbba0e4d',
        allocationId: '75b37d67-3852-4fda-aaf7-25bb594e83d9',
        ledgerAccountId: '48dc2b43-75da-4ff2-a33d-76b0aca5f5b8',
        type: 'ALLOCATION' as 'ALLOCATION',
        cardId: undefined,
        ledgerBalance: {
          currency: 'USD' as 'USD',
          amount: 1,
        },
        availableBalance: {
          currency: 'USD' as 'USD',
          amount: 1,
        },
      },
      ownerId: '',
      parentAllocationId: 'bdb01f17-5f1c-4e31-ad43-90fefb6e7954',
      childrenAllocationIds: [],
    },
    {
      allocationId: '527b4e6c-a069-4d07-bd44-10fc04070f7d',
      name: 'IT',
      account: {
        accountId: '5b2468a5-9245-45ae-9b4c-32ff450be870',
        businessId: '58022877-a122-47b8-8f78-7bdfbbba0e4d',
        allocationId: '527b4e6c-a069-4d07-bd44-10fc04070f7d',
        ledgerAccountId: '044b8d86-913e-49a8-811f-41c586d4581f',
        type: 'ALLOCATION' as 'ALLOCATION',
        cardId: undefined,
        ledgerBalance: {
          currency: 'USD' as 'USD',
          amount: 1,
        },
        availableBalance: {
          currency: 'USD' as 'USD',
          amount: 1,
        },
      },
      ownerId: '',
      parentAllocationId: '1d77bbeb-d765-43b8-a947-0d13e54cf871',
      childrenAllocationIds: ['bdb01f17-5f1c-4e31-ad43-90fefb6e7954'],
    },
    {
      allocationId: '1d77bbeb-d765-43b8-a947-0d13e54cf871',
      name: 'Dovetail',
      account: {
        accountId: '618175ef-c8fc-4695-8a02-5414440a0cda',
        businessId: '58022877-a122-47b8-8f78-7bdfbbba0e4d',
        allocationId: '1d77bbeb-d765-43b8-a947-0d13e54cf871',
        ledgerAccountId: '024dfe66-ac98-4b55-918d-312ab55fd10c',
        type: 'ALLOCATION' as 'ALLOCATION',
        cardId: undefined,
        ledgerBalance: {
          currency: 'USD' as 'USD',
          amount: 708,
        },
        availableBalance: {
          currency: 'USD' as 'USD',
          amount: 708,
        },
      },
      ownerId: '',
      parentAllocationId: undefined,
      childrenAllocationIds: [
        '7a2ed2cd-f517-428e-8b3e-bf7e13b1bb51',
        '527b4e6c-a069-4d07-bd44-10fc04070f7d',
        '2587f140-93af-453a-904d-506eac12a53a',
      ],
    },
    {
      allocationId: 'aa469797-9b3b-46b5-8528-1312238c03d4',
      name: 'Q2 2022',
      account: {
        accountId: 'e9dd963d-74fe-4c79-952b-7e07b86cfd64',
        businessId: '58022877-a122-47b8-8f78-7bdfbbba0e4d',
        allocationId: 'aa469797-9b3b-46b5-8528-1312238c03d4',
        ledgerAccountId: 'e2e1f756-1335-4188-b9ea-da0fdadbe403',
        type: 'ALLOCATION' as 'ALLOCATION',
        cardId: undefined,
        ledgerBalance: {
          currency: 'USD' as 'USD',
          amount: 5,
        },
        availableBalance: {
          currency: 'USD' as 'USD',
          amount: 5,
        },
      },
      ownerId: '',
      parentAllocationId: '2587f140-93af-453a-904d-506eac12a53a',
      childrenAllocationIds: [],
    },
    {
      allocationId: 'bdb01f17-5f1c-4e31-ad43-90fefb6e7954',
      name: 'Lunch',
      account: {
        accountId: '477cd256-d361-4bba-9895-84afc2f69914',
        businessId: '58022877-a122-47b8-8f78-7bdfbbba0e4d',
        allocationId: 'bdb01f17-5f1c-4e31-ad43-90fefb6e7954',
        ledgerAccountId: '9bfe796f-2686-43bc-8911-d1656d548949',
        type: 'ALLOCATION' as 'ALLOCATION',
        cardId: undefined,
        ledgerBalance: {
          currency: 'USD' as 'USD',
          amount: 1,
        },
        availableBalance: {
          currency: 'USD' as 'USD',
          amount: 1,
        },
      },
      ownerId: '',
      parentAllocationId: '527b4e6c-a069-4d07-bd44-10fc04070f7d',
      childrenAllocationIds: [
        '75b37d67-3852-4fda-aaf7-25bb594e83d9',
        '88243a69-b24f-4695-a70e-9089ca0998ce',
      ],
    },
    {
      allocationId: '88243a69-b24f-4695-a70e-9089ca0998ce',
      name: 'Dinner',
      account: {
        accountId: '89925532-9177-4964-84f5-d655427cb8e1',
        businessId: '58022877-a122-47b8-8f78-7bdfbbba0e4d',
        allocationId: '88243a69-b24f-4695-a70e-9089ca0998ce',
        ledgerAccountId: '9e45b90c-a34e-4b20-b9ef-5eea7cf602c5',
        type: 'ALLOCATION' as 'ALLOCATION',
        cardId: undefined,
        ledgerBalance: {
          currency: 'USD' as 'USD',
          amount: 108,
        },
        availableBalance: {
          currency: 'USD' as 'USD',
          amount: 108,
        },
      },
      ownerId: '',
      parentAllocationId: 'bdb01f17-5f1c-4e31-ad43-90fefb6e7954',
      childrenAllocationIds: [],
    },
    {
      allocationId: 'c057f800-5920-4fda-a0db-14f7d3c454c4',
      name: 'Permissions',
      account: {
        accountId: 'dae0b467-03cd-48c0-9f7a-38d41d2737ab',
        businessId: '58022877-a122-47b8-8f78-7bdfbbba0e4d',
        allocationId: 'c057f800-5920-4fda-a0db-14f7d3c454c4',
        ledgerAccountId: '36038ae5-6239-40d2-acf0-9d25fc80b6f0',
        type: 'ALLOCATION' as 'ALLOCATION',
        cardId: undefined,
        ledgerBalance: {
          currency: 'USD' as 'USD',
          amount: 10,
        },
        availableBalance: {
          currency: 'USD' as 'USD',
          amount: 10,
        },
      },
      ownerId: '',
      parentAllocationId: '2587f140-93af-453a-904d-506eac12a53a',
      childrenAllocationIds: [],
    },
    {
      allocationId: '2587f140-93af-453a-904d-506eac12a53a',
      name: 'Marketing',
      account: {
        accountId: 'd1959c32-527b-44a4-ba0c-a6b52bf2a9ee',
        businessId: '58022877-a122-47b8-8f78-7bdfbbba0e4d',
        allocationId: '2587f140-93af-453a-904d-506eac12a53a',
        ledgerAccountId: 'b78de55d-86da-4125-876b-8e58db12010b',
        type: 'ALLOCATION' as 'ALLOCATION',
        cardId: undefined,
        ledgerBalance: {
          currency: 'USD' as 'USD',
          amount: 137.96,
        },
        availableBalance: {
          currency: 'USD' as 'USD',
          amount: 137.96,
        },
      },
      ownerId: '',
      parentAllocationId: '1d77bbeb-d765-43b8-a947-0d13e54cf871',
      childrenAllocationIds: [
        'aa469797-9b3b-46b5-8528-1312238c03d4',
        'c057f800-5920-4fda-a0db-14f7d3c454c4',
      ],
    },
  ],
};

export const managerResponse = [
  {
    allocationId: '1dfe6b7d-0237-4551-8494-fce7b3cf5641',
    name: 'Smaller Business Inc',
    account: {
      accountId: 'd2a832d3-bbf4-47ab-a730-435c1ec5b79a',
      businessId: '0ff78a14-8a71-43b4-a768-9f7687c5c579',
      allocationId: '1dfe6b7d-0237-4551-8494-fce7b3cf5641',
      ledgerAccountId: '3e89af6f-aa63-4cc4-8cc7-e78bb04c1bc5',
      type: 'ALLOCATION' as 'ALLOCATION',
      cardId: undefined,
      ledgerBalance: {
        currency: 'USD' as 'USD',
        amount: 800,
      },
      availableBalance: {
        currency: 'USD' as 'USD',
        amount: 800,
      },
    },
    ownerId: '',
    parentAllocationId: '833682fa-5c68-4377-a31e-d37b6aab9bc3',
    childrenAllocationIds: [],
  },
  {
    allocationId: '9bcb9c0e-c92e-4497-abc0-4f2495b4be7e',
    name: 'Tiny Business Ltd',
    account: {
      accountId: '33721c2a-3d45-40e9-affe-04baa5125af2',
      businessId: '0ff78a14-8a71-43b4-a768-9f7687c5c579',
      allocationId: '9bcb9c0e-c92e-4497-abc0-4f2495b4be7e',
      ledgerAccountId: 'a8888c6e-1547-40ed-a314-fd2c8a7cdc0a',
      type: 'ALLOCATION' as 'ALLOCATION',
      cardId: undefined,
      ledgerBalance: {
        currency: 'USD' as 'USD',
        amount: 200,
      },
      availableBalance: {
        currency: 'USD' as 'USD',
        amount: 200,
      },
    },
    ownerId: '',
    parentAllocationId: '1dfe6b7d-0237-4551-8494-fce7b3cf5641',
    childrenAllocationIds: [],
  },
  {
    allocationId: '442724f3-6dfa-43a8-9506-7f0f26e74525',
    name: 'Another Smaller Business Inc',
    account: {
      accountId: '9c1d8830-8f84-49ca-938c-46a0012b18d6',
      businessId: '0ff78a14-8a71-43b4-a768-9f7687c5c579',
      allocationId: '442724f3-6dfa-43a8-9506-7f0f26e74525',
      ledgerAccountId: 'd5423847-d3bb-4fc2-b28e-8a3c655b3bb8',
      type: 'ALLOCATION' as 'ALLOCATION',
      cardId: undefined,
      ledgerBalance: {
        currency: 'USD' as 'USD',
        amount: 300,
      },
      availableBalance: {
        currency: 'USD' as 'USD',
        amount: 300,
      },
    },
    ownerId: '',
    parentAllocationId: '833682fa-5c68-4377-a31e-d37b6aab9bc3',
    childrenAllocationIds: [],
  },
  {
    allocationId: '92a026c1-dc06-4ded-8312-015865e470a7',
    name: 'Another Tiny Business Ltd',
    account: {
      accountId: 'cde777f6-e06f-4dd3-a904-28d9546b538e',
      businessId: '0ff78a14-8a71-43b4-a768-9f7687c5c579',
      allocationId: '92a026c1-dc06-4ded-8312-015865e470a7',
      ledgerAccountId: '930dd569-894a-4f79-a9b6-6ec29a135671',
      type: 'ALLOCATION' as 'ALLOCATION',
      cardId: undefined,
      ledgerBalance: {
        currency: 'USD' as 'USD',
        amount: 200,
      },
      availableBalance: {
        currency: 'USD' as 'USD',
        amount: 200,
      },
    },
    ownerId: '',
    parentAllocationId: '442724f3-6dfa-43a8-9506-7f0f26e74525',
    childrenAllocationIds: [],
  },
];

export const fiveLevelsDeepResponse = {
  userRoles: [
    {
      allocationId: '1',
      allocationPermissions: ADMIN_ALLOCATION_PERMISSIONS,
    },
    {
      allocationId: '1-1',
      allocationPermissions: ADMIN_ALLOCATION_PERMISSIONS,
    },
    {
      allocationId: '1-2',
      allocationPermissions: ADMIN_ALLOCATION_PERMISSIONS,
    },
    {
      allocationId: '1-1-1',
      allocationPermissions: ADMIN_ALLOCATION_PERMISSIONS,
    },
    {
      allocationId: '1-1-2',
      allocationPermissions: ADMIN_ALLOCATION_PERMISSIONS,
    },
    {
      allocationId: '1-1-1-1',
      allocationPermissions: ADMIN_ALLOCATION_PERMISSIONS,
    },
    {
      allocationId: '1-1-1-2',
      allocationPermissions: ADMIN_ALLOCATION_PERMISSIONS,
    },
    {
      allocationId: '1-1-1-1-1',
      allocationPermissions: ADMIN_ALLOCATION_PERMISSIONS,
    },
    {
      allocationId: '1-1-1-1-2',
      allocationPermissions: ADMIN_ALLOCATION_PERMISSIONS,
    },
  ],
  allocations: [
    {
      allocationId: '1',
      name: 'One',
      account: {
        availableBalance: {
          currency: 'USD' as 'USD',
          amount: 10000,
        },
      },
      parentAllocationId: null,
    },
    {
      allocationId: '1-1',
      name: 'One-One',
      account: {
        availableBalance: {
          currency: 'USD' as 'USD',
          amount: 8000,
        },
      },
      parentAllocationId: '1',
    },
    {
      allocationId: '1-2',
      name: 'One-Two',
      account: {
        availableBalance: {
          currency: 'USD' as 'USD',
          amount: 8000,
        },
      },
      parentAllocationId: '1',
    },
    {
      allocationId: '1-1-1',
      name: 'One-One-One',
      account: {
        availableBalance: {
          currency: 'USD' as 'USD',
          amount: 6000,
        },
      },
      parentAllocationId: '1-1',
    },
    {
      allocationId: '1-1-2',
      name: 'One-One-Two',
      account: {
        availableBalance: {
          currency: 'USD' as 'USD',
          amount: 6000,
        },
      },
      parentAllocationId: '1-1',
    },
    {
      allocationId: '1-1-1-1',
      name: 'One-One-One-One',
      account: {
        availableBalance: {
          currency: 'USD' as 'USD',
          amount: 4000,
        },
      },
      parentAllocationId: '1-1-1',
    },
    {
      allocationId: '1-1-1-2',
      name: 'One-One-One-Two',
      account: {
        availableBalance: {
          currency: 'USD' as 'USD',
          amount: 4000,
        },
      },
      parentAllocationId: '1-1-1',
    },
    {
      allocationId: '1-1-1-1-1',
      name: 'One-One-One-One-One',
      account: {
        availableBalance: {
          currency: 'USD' as 'USD',
          amount: 2000,
        },
      },
      parentAllocationId: '1-1-1-1',
    },
    {
      allocationId: '1-1-1-1-2',
      name: 'One-One-One-One-Two',
      account: {
        availableBalance: {
          currency: 'USD' as 'USD',
          amount: 2000,
        },
      },
      parentAllocationId: '1-1-1-1',
    },
  ],
};

// Manager with only permission on a single allocation
export const mixedResponse = {
  allocations: [
    {
      allocationId: 'b6db6a57-1118-4b15-a1ea-c79fef63b3ae',
      name: 'Dovetail Dev',
      account: {
        accountId: 'f6be9b05-8927-4652-bf2e-8e8a283e3875',
        businessId: '1e7e106b-4177-47aa-a8d6-e4cf5ae26157',
        allocationId: 'b6db6a57-1118-4b15-a1ea-c79fef63b3ae',
        ledgerAccountId: 'b0e66aa2-1a2a-4380-ba20-6c499202b9c0',
        type: 'ALLOCATION',
        cardId: undefined,
        ledgerBalance: {
          currency: 'USD',
          amount: 3000,
        },
        availableBalance: {
          currency: 'USD',
          amount: 3000,
        },
      },
      parentAllocationId: undefined,
      childrenAllocationIds: [],
    },
    {
      allocationId: 'e6c51675-5874-4cf7-9a7d-e9a978279be2',
      name: 'Development Team',
      account: {
        accountId: '3b58b46e-91f3-4f83-ab35-ed4eea883f45',
        businessId: '1e7e106b-4177-47aa-a8d6-e4cf5ae26157',
        allocationId: 'e6c51675-5874-4cf7-9a7d-e9a978279be2',
        ledgerAccountId: 'fb7564e5-aefb-43cd-b3ff-99e960aba8a9',
        type: 'ALLOCATION',
        cardId: undefined,
        ledgerBalance: {
          currency: 'USD',
          amount: 490,
        },
        availableBalance: {
          currency: 'USD',
          amount: 490,
        },
      },
      parentAllocationId: 'b6db6a57-1118-4b15-a1ea-c79fef63b3ae',
      childrenAllocationIds: [],
    },
    {
      allocationId: 'f6ed2055-a581-42fb-8f4f-aaef1f373c04',
      name: 'Really Long Name for an Allocation',
      account: {
        accountId: '13d80922-4f8d-46cf-9a6d-d9ae8d390fa8',
        businessId: '1e7e106b-4177-47aa-a8d6-e4cf5ae26157',
        allocationId: 'f6ed2055-a581-42fb-8f4f-aaef1f373c04',
        ledgerAccountId: 'a430e76e-d88c-43cf-a4a1-92cb0eb3f325',
        type: 'ALLOCATION',
        cardId: undefined,
        ledgerBalance: {
          currency: 'USD',
          amount: 500,
        },
        availableBalance: {
          currency: 'USD',
          amount: 500,
        },
      },
      parentAllocationId: 'b6db6a57-1118-4b15-a1ea-c79fef63b3ae',
      childrenAllocationIds: [],
    },
    {
      allocationId: 'd998c97b-02e0-4dd1-873d-0d3142b4b0a3',
      name: 'Marketing',
      account: {
        accountId: 'e29dc8df-b2de-40fa-afa0-eeba9101db9b',
        businessId: '1e7e106b-4177-47aa-a8d6-e4cf5ae26157',
        allocationId: 'd998c97b-02e0-4dd1-873d-0d3142b4b0a3',
        ledgerAccountId: '8874f7d9-0d3b-4650-8fb5-4816a81d397a',
        type: 'ALLOCATION',
        cardId: undefined,
        ledgerBalance: {
          currency: 'USD',
          amount: 955,
        },
        availableBalance: {
          currency: 'USD',
          amount: 955,
        },
      },
      parentAllocationId: 'b6db6a57-1118-4b15-a1ea-c79fef63b3ae',
      childrenAllocationIds: [],
    },
  ],
  userRoles: [
    {
      allocationId: 'b6db6a57-1118-4b15-a1ea-c79fef63b3ae',
      parentAllocationId: undefined,
      user: {
        userId: 'e12189f0-85e1-4dea-a81f-c1624d683521',
        type: 'EMPLOYEE',
        firstName: 'Misha',
        lastName: 'Mixer',
        archived: false,
      },
      allocationRole: 'View only',
      inherited: false,
      allocationPermissions: ['READ', 'CATEGORIZE', 'LINK_RECEIPTS', 'EMPLOYEE', 'VIEW_OWN'],
      globalUserPermissions: [],
    },
    {
      allocationId: 'd998c97b-02e0-4dd1-873d-0d3142b4b0a3',
      parentAllocationId: 'b6db6a57-1118-4b15-a1ea-c79fef63b3ae',
      user: {
        userId: 'e12189f0-85e1-4dea-a81f-c1624d683521',
        type: 'EMPLOYEE',
        firstName: 'Misha',
        lastName: 'Mixer',
        archived: false,
      },
      allocationRole: 'Manager',
      inherited: false,
      allocationPermissions: [
        'READ',
        'CATEGORIZE',
        'LINK_RECEIPTS',
        'EMPLOYEE',
        'MANAGE_FUNDS',
        'MANAGE_CARDS',
        'MANAGE_PERMISSIONS',
        'MANAGE_CONNECTIONS',
        'VIEW_OWN',
      ],
      globalUserPermissions: [],
    },
    {
      allocationId: 'e6c51675-5874-4cf7-9a7d-e9a978279be2',
      parentAllocationId: 'b6db6a57-1118-4b15-a1ea-c79fef63b3ae',
      user: {
        userId: 'e12189f0-85e1-4dea-a81f-c1624d683521',
        type: 'EMPLOYEE',
        firstName: 'Misha',
        lastName: 'Mixer',
        archived: false,
      },
      allocationRole: 'View only',
      inherited: true,
      allocationPermissions: ['READ', 'CATEGORIZE', 'LINK_RECEIPTS', 'EMPLOYEE', 'VIEW_OWN'],
      globalUserPermissions: [],
    },
    {
      allocationId: 'f6ed2055-a581-42fb-8f4f-aaef1f373c04',
      parentAllocationId: 'b6db6a57-1118-4b15-a1ea-c79fef63b3ae',
      user: {
        userId: 'e12189f0-85e1-4dea-a81f-c1624d683521',
        type: 'EMPLOYEE',
        firstName: 'Misha',
        lastName: 'Mixer',
        archived: false,
      },
      allocationRole: 'View only',
      inherited: true,
      allocationPermissions: ['READ', 'CATEGORIZE', 'LINK_RECEIPTS', 'EMPLOYEE', 'VIEW_OWN'],
      globalUserPermissions: [],
    },
  ],
};
