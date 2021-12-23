const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const exitHook = require('async-exit-hook');

const auth = require('./resources/auth.json');
var usersCards = require('./resources/usersCards.json');
var transactions = require('./resources/transactions.json');
const images = require('./images.js');

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  }),
);

const port = 8000;

app.post('/oauth2/token', (req, res) => {
  const { username, password, refreh_token: refreshToken } = req.body;

  const authorized = auth.find(
    (x) =>
      (x.username === username && x.password === password) ||
      x.authorization.refresh_token === refreshToken,
  );

  if (authorized) {
    res.json(authorized.authorization);
  } else
    res.status(401).json({
      error: 'invalid_grant',
      error_description: 'The user credentials are invalid.',
      error_reason: 'invalid_user_credentials',
    });
});

const checkAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send('missing authorization');
    return;
  }

  const token = authorization.split(' ')[1];
  if (token) {
    const authorized = auth.find((x) => x.authorization.access_token === token);
    if (!authorized) {
      res.status(401).send('invalid token');
      return;
    }
    res.locals.userId = authorized.authorization.userId;
    next();
  } else res.status(401).send('no token');
};

// Get all cards for this user - Wallet
app.get('/users/cards', checkAuthorization, (req, res) => {
  const { userId } = res.locals;

  const userCardsByUserId = usersCards.filter((x) => x.card.userId === userId);
  res.json(userCardsByUserId);
});

// Get single card info - Card Details, Card Info
app.get('/users/cards/:id', checkAuthorization, (req, res) => {
  const { params } = req;
  const { id } = params;

  const card = usersCards.find((x) => x.card.cardId === id);
  res.json(card);
});

// Get all transactions for given card
app.get('/users/cards/:cardId/account-activity', checkAuthorization, (req, res) => {
  const { params, query } = req;
  const { cardId } = params;
  // const { type, dateFrom, dateTo, pageRequest } = query;

  const card = transactions.find((x) => x.cardId === cardId);
  const response = card?.response;

  res.json(response || []);
});

// Get single transaction info
app.get('/users/account-activity/:accountActivityId', checkAuthorization, (req, res) => {
  const { params } = req;
  const { accountActivityId } = params;
  const trxns = transactions[0].response.content;
  const transaction = trxns.find((x) => x.accountActivityId === accountActivityId);
  res.json(transaction);
});

// Block (freeze) card
app.patch('/users/cards/:cardId/block', (req, res) => {
  const { params } = req;
  const { cardId } = params;

  const idx = usersCards.findIndex((c) => c.card.cardId === cardId);
  const cardItem = usersCards[idx];
  const { card } = cardItem;

  const modifiedCard = { ...cardItem, card: { ...card, ...{ status: 'BLOCKED' } } };

  usersCards[idx] = modifiedCard;
  res.json(modifiedCard);
});

// Unblock (unfreeze) card
app.patch('/users/cards/:cardId/unblock', (req, res) => {
  const { params } = req;
  const { cardId } = params;

  const idx = usersCards.findIndex((c) => c.card.cardId === cardId);
  const cardItem = usersCards[idx];
  const { card } = cardItem;

  const modifiedCard = { ...cardItem, card: { ...card, ...{ status: 'OPEN' } } };

  usersCards[idx] = modifiedCard;
  res.json(modifiedCard);
});

app.post('/users/account-activity/:accountActivityId/receipts/:receiptId/link', (req, res) => {
  const { params } = req;
  const { accountActivityId, receiptId } = params;

  const cardIdx = transactions.findIndex((t) =>
    t.response.content.find((x) => x.accountActivityId === accountActivityId),
  );

  const transactionIdx = transactions[cardIdx].response.content.findIndex(
    (t) => t.accountActivityId === accountActivityId,
  );

  const currentTransaction = transactions[cardIdx].response.content[transactionIdx];

  const newTransactionWithReceiptUpdated = {
    ...currentTransaction,
    receipt: {
      receiptId,
    },
  };

  transactions[cardIdx].response.content[transactionIdx] = newTransactionWithReceiptUpdated;

  res.json(newTransactionWithReceiptUpdated);
});

app.post('/users/account-activity/:accountActivityId/receipts/:receiptId/link', (req, res) => {
  const { params } = req;
  const { accountActivityId, receiptId } = params;

  const cardIdx = transactions.findIndex((t) =>
    t.response.content.find((x) => x.accountActivityId === accountActivityId),
  );

  const transactionIdx = transactions[cardIdx].response.content.findIndex(
    (t) => t.accountActivityId === accountActivityId,
  );

  const currentTransaction = transactions[cardIdx].response.content[transactionIdx];

  const newTransactionWithReceiptUpdated = {
    ...currentTransaction,
    receipt: null,
  };

  transactions[cardIdx].response.content[transactionIdx] = newTransactionWithReceiptUpdated;

  res.json(newTransactionWithReceiptUpdated);
});

app.use('/images', images);

app.listen(port, () => {
  console.log(`REST server listening on port ${port}!`);
});

exitHook((callback) => {
  console.log('cleaning up uploads...');
  const uploadPath = __dirname + '/uploads';
  fs.readdir(uploadPath, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      if (file.endsWith('jpg')) {
        fs.unlink(path.join(uploadPath, file), (err) => {
          if (err) throw err;
        });
      }
    }

    if (callback) {
      callback();
    }
  });
});
