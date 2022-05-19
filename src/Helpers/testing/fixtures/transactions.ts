export const transaction = {
  accountActivityId: 'c2ccd809-3afc-4f56-b52d-0fdb9b1cd6a4',
  activityTime: '2022-03-28T11:00:55.748252Z',
  accountName: 'Q2 2022',
  card: {
    cardId: '4c69ffee-c039-431d-9acb-e3c3e508d4d6',
    lastFour: '0351',
    allocationName: 'Q2 2022',
    ownerFirstName: 'Rodrigo',
    ownerLastName: 'Mathias',
  },
  merchant: {
    name: 'Lord of the fries',
    type: 'TRANSPORTATION_SERVICES',
    amount: null,
    merchantNumber: '1234567890',
    merchantCategoryCode: 4789,
    merchantCategoryGroup: 'TRAVEL',
    merchantLogoUrl: 'https://logo.clearbit.com/lordofthefries.com.au',
    merchantLatitude: null,
    merchantLongitude: null,
    merchantCountry: null,
    codatSupplierName: null,
    codatSupplierId: null,
  },
  type: 'NETWORK_CAPTURE',
  status: 'APPROVED',
  amount: { currency: 'USD', amount: -7.0 },
  requestedAmount: { currency: 'USD', amount: -7.0 },
  receipt: { receiptId: [] },
  notes: 'Ate some fries.',
  expenseDetails: null,
  syncStatus: 'NOT_READY',
  lastSyncTime: null,
  declineDetails: null,
  paymentDetails: null,
};

export const transactionWithCategory = {
  ...transaction,
  expenseDetails: {
    iconRef: 0,
    expenseCategoryId: 'f85c4f88-1cf6-4bdb-a394-0c89a4d74f53',
    categoryName: 'Meals',
  },
};

export const transactionWithReceipt = {
  ...transaction,
  receipt: { receiptId: ['f314e270-4c8b-4aaf-b3c5-0b36f1913084'] },
};
