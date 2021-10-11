const { gql } = require('apollo-server');

const typeDefs = gql`
  type Transaction {
    transactionId: String!
    merchantName: String!
    merchantId: String
    merchantCategory: String
    merchantLogoUrl: String
    currency: String
    amount: Float!
    withDrawn: Boolean!
    date: String!
    time: String!
    isReceiptLinked: Boolean
    receiptUrl: String
    notes: String
    status: TransactionStatus
  }

  enum TransactionStatus {
    PENDING
    APPROVED
    DECLINED
  }

  type Card {
    cardId: String
    creationDate: String
    expirationDate: String
    isVirtual: Boolean
    isDisposable: Boolean
    isFrozen: Boolean
    balance: String
    currency: String
    lastDigits: String
    cardNumber: String
    cardTitle: String
    cardholderName: String
    billingAddress: String
    cvv: String
    transactions: [Transaction]
  }

  # "RootQuery" type lists all of the available queries that clients can execute,
  # along with the return type for each, define in typeDefs
  type Query {
    cards: [Card]
    card(cardId: ID!): Card
  }
`;

module.exports = {
  typeDefs,
};
