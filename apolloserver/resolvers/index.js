const { Card } = require('../models');

const resolvers = {
  Query: {
    cards: () => Card.all(),
    card: (_, {cardId}) => Card.card(cardId),
  }
};

module.exports = {
  resolvers,
};
