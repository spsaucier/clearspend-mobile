const { Card } = require('../models');

const resolvers = {
  Query: {
    cards: () => Card.all(),
  },
};

module.exports = {
  resolvers,
};
