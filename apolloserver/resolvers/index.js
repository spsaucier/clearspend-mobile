const { Card } = require('../models');

const resolvers = {
  Query: {
    cards: () => Card.all(),
    card: (_, { cardId }) => Card.card(cardId),
    transaction: (_, { cardId, transactionId }) => Card.transaction(cardId, transactionId),
    transactions: (_, { cardId }) => Card.transactions(cardId),
  },
};

module.exports = {
  resolvers,
};
