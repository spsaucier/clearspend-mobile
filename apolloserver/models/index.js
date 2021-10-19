const { cards } = require('../data/index');

class Card {
  static all() {
    return cards;
  }

  static card(cardId){
    return cards.find(card => card.cardId === cardId);
  }
}

module.exports = {
  Card,
};
