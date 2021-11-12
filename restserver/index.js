const express = require('express');
const app = express();
const port = 8000;
const cards = require('./resources/cards.json');
const transactions = require('./resources/transactions.json');

app.get('/users/cards', (req, res) => {
  res.json(cards);
});

app.get('/cards/:id', (req, res) => {
  const { params } = req;
  const { id } = params;

  const card = cards.find((x) => x.cardId === id);
  res.json(card);
});

app.get('/cards/:id/transactions', (req, res) => {
  const { params } = req;
  const { id } = params;

  const card = transactions.find((x) => x.cardId === id);
  res.json(card.transactions);
});

app.get('/cards/:cardId/transactions/:transactionId', (req, res) => {
  const { params } = req;
  const { cardId, transactionId } = params;

  const card = transactions.find((x) => x.cardId === cardId);
  const transaction = card.transactions.find((x) => x.transactionId === transactionId);
  res.json(transaction);
});

app.listen(port, () => {
  console.log(`REST server listening on port ${port}!`);
});
