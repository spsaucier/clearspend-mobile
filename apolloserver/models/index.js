const { cards } = require('../data/index');

class Card {
  static all() {
    return cards;
  }

  static card(cardId){
    return cards.find(card => card.cardId === cardId);
  }

  static transactions(cardId){
    const card = cards.find(card => card.cardId === cardId);
    return card.transactions;
  }

  static transaction(cardId, transactionId){
    const card = cards.find(card => card.cardId === cardId);
    const transactions = card.transactions;
    return transactions.find(transaction => transaction.transactionId === transactionId);
  }
}

module.exports = {
  Card,
};
