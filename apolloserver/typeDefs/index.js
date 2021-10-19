const { gql } = require('apollo-server');

const typeDefs = gql`  
  type User {
    id: ID!
    name: String!
    email: String!
    token: String
    cards: [Card]
  }
  
  type Transaction {
    transactionId: String!
    merchantName: String!
    merchantId: String
    merchantCategory: String
    merchantCategoryCode: String
    merchantLogoUrl: String
    currency: String
    amount: Float!
#    credited: Boolean!
    date: String!
    time: String!
    isReceiptLinked: Boolean
    receiptUrl: String
    notes: String
    status: TransactionStatus
    location: String
  }

  enum TransactionStatus {
    PENDING
    APPROVED
    DECLINED
  }

  type Card {
    cardId: ID!
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
    transactions: [Transaction]!
  }

  # "RootQuery" type lists all of the available queries that clients can execute,
  # along with the return type for each, define in typeDefs
  type Query {
    cards: [Card]!
    card(cardId: ID!): Card
#    transactions(cardId: ID!): [Transaction]!
#    transaction(transactionId: ID!): Transaction!
    user (id: ID!): User!
  }

  type Mutation {
    login(email: String): User
  }
`;

module.exports = {
  typeDefs,
};
