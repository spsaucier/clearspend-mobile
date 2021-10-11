const { cards } = require('../data/index');

class Card {
  static all() {
    return cards;
  }
}

module.exports = {
  Card,
};
