const transactions = [
  {
    "transactionId": "1",
    "merchantName": "T Mobile",
    "merchantID": 9890166625399447,
    "merchantCategory": "groceries",
    "merchantLogoUrl": "",
    "merchantCategoryCode": 4814,
    "amount": 77.92,
    "currency": "USD",
    "date": "06-24-2021",
    "time": "4:39pm",
    "receiptLink": "",
    "isReceiptLinked": true,
    "notes": "Monthly mobile phone bill",
    "status": "APPROVED",
    "location": "",
    "country": "United States",
  },
  {
    "transactionId": "2",
    "merchantName": "Wallmart",
    "merchantID": 9890166625399430,
    "merchantCategory": "",
    "merchantLogoUrl": "https://s3.amazonaws.com/www-inside-design/uploads/2018/04/walmart-square.jpg",
    "merchantCategoryCode": 5200,
    "amount": 12.88,
    "currency": "USD",
    "date": "05-01-2021",
    "time": "2:08pm",
    "receiptLink": "",
    "isReceiptLinked": false,
    "notes": "Stationery for the office",
    "status": "PENDING",
    "location": "",
    "country": "United States",
  },
  {
    "transactionId": "3",
    "merchantName": "Adobe",
    "merchantID": 9890112325399477,
    "merchantCategory": "",
    "merchantLogoUrl": "",
    "merchantCategoryCode": 120,
    "amount": 100.99,
    "currency": "USD",
    "date": "06-30-2021",
    "time": "12:01am",
    "receiptLink": "",
    "isReceiptLinked": false,
    "notes": "monthly subscription",
    "status": "DECLINED",
    "location": "",
    "country": "United States",
  }
];

const cards = [
  {
    cardId: '1111',
    creationDate: '',
    expirationDate: '',
    status: '',
    isVirtual: true,
    isDisposable: true,
    isFrozen: false,
    balance: '200.50',
    currency: 'USD',
    fundingType: '',
    lastDigits: '4285',
    cardNumber: '5443 4562 2345 4284',
    cardTitle: 'Sales Card',
    cardHolderName: 'Jack Smith',
    billingAddress: 'TBC',
    cvv: '401',
    transactions: [
      {
        "transactionId": "234",
        "merchantName": "Kmart",
        "merchantID": 9890166625399430,
        "merchantCategory": "Retail",
        "merchantLogoUrl": "",
        "merchantCategoryCode": 5200,
        "amount": 55.88,
        "currency": "USD",
        "date": "05-02-2021",
        "time": "2:08pm",
        "receiptLink": "http://something.com",
        "isReceiptLinked": false,
        "notes": "Stationery for the office",
        "status": "PENDING",
        "location": "",
        "country": "United States",
      },
      {
        "transactionId": "777",
        "merchantName": "Countdown",
        "merchantID": 6821842433192166,
        "merchantCategory": "",
        "merchantLogoUrl": "",
        "merchantCategoryCode": 5300,
        "amount": 12.22,
        "currency": "USD",
        "date": "05-01-2021",
        "time": "3:12pm",
        "receiptLink": "",
        "isReceiptLinked": false,
        "notes": "Groceries",
        "status": "APPROVED",
        "location": ""
      },
      {
        "transactionId": "4567",
        "merchantName": "New World",
        "merchantID": 3010258132654628,
        "merchantCategory": "",
        "merchantLogoUrl": "",
        "merchantCategoryCode": 5300,
        "amount": 45.09,
        "currency": "USD",
        "date": "05-01-2021",
        "time": "12:12pm",
        "receiptLink": "",
        "isReceiptLinked": false,
        "notes": "Groceries",
        "status": "APPROVED",
        "location": ""
      },
      {
        "transactionId": "123",
        "merchantName": "T Mobile",
        "merchantID": 9890166625399447,
        "merchantCategory": "Groceries",
        "merchantLogoUrl": "",
        "merchantCategoryCode": 4814,
        "amount": 77.92,
        "currency": "USD",
        "date": "06-24-2021",
        "time": "4:39pm",
        "receiptLink": "",
        "isReceiptLinked": true,
        "notes": "Monthly mobile phone bill",
        "status": "APPROVED",
        "location": "",
        "country": "United States",
      },
    ],
  },
  {
    cardId: '2222',
    creationDate: '',
    expirationDate: '',
    isVirtual: true,
    isDisposable: false,
    isFrozen: false,
    balance: '1234.50',
    currency: 'USD',
    lastDigits: '4283',
    cardNumber: '2341 4562 2345 4283',
    cardTitle: 'Sales Card',
    cardHolderName: 'Jack Smith',
    billingAddress: 'TBC',
    cvv: '401',
    transactions: transactions,
  },
  {
    cardId: '3333',
    creationDate: '',
    expirationDate: '',
    isVirtual: false,
    isDisposable: false,
    isFrozen: false,
    balance: '50.50',
    currency: 'USD',
    lastDigits: '1234',
    cardNumber: '6464 4562 2345 1234',
    cardTitle: 'Sales Card',
    cardHolderName: 'Jack Smith',
    billingAddress: 'TBC',
    cvv: '401',
    transactions: [],
  },
  {
    cardId: '4444',
    creationDate: '',
    expirationDate: '',
    isVirtual: true,
    isDisposable: true,
    isFrozen: true,
    balance: '5000.00',
    currency: 'USD',
    lastDigits: '6464',
    cardNumber: '7345 4562 2345 6464',
    cardTitle: 'Event Card',
    cardHolderName: 'Jack Smith',
    billingAddress: 'TBC',
    cvv: '401',
    transactions: [],
  },
];

module.exports = {
  cards,
};
