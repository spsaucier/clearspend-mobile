const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const exitHook = require('async-exit-hook');
const jwt = require('jsonwebtoken');

const users = require('./resources/users.json');
const usersCards = require('./resources/usersCards.json');
const transactions = require('./resources/transactions.json');
const images = require('./images.js');

const TOKEN_KEY = 'XYZRANDOM';
const port = 8000;

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

const toJWTResponse = (user, res) => {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 2;
  const { profile, refreshToken } = user;
  const { userId, email } = profile;
  const token = jwt.sign({ userId, email, exp }, TOKEN_KEY);
  res.json({
    token,
    refreshToken,
    user,
  });
};

app.post('/api/login', (req, res) => {
  const { loginId, password } = req.body;

  const user = users.find((x) => x.username === loginId && x.password === password);

  if (user) {
    toJWTResponse(user, res);
  } else {
    res.status(401).json({
      error: 'invalid_grant',
      error_description: 'The user credentials are invalid.',
      error_reason: 'invalid_user_credentials',
    });
  }
});

app.post('/api/jwt/refresh', (req, res) => {
  const { refreshToken } = req.body;

  const user = users.find((x) => x.authorization.refreshToken === refreshToken);

  if (user) {
    toJWTResponse(user);
  } else {
    res.status(401).json({
      error: 'invalid_grant',
      error_description: 'The user credentials are invalid.',
      error_reason: 'invalid_user_credentials',
    });
  }
});

const checkAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send('missing authorization');
    return;
  }

  const token = authorization.split(' ')[1];
  if (token) {
    const authorized = jwt.verify(token, TOKEN_KEY);
    if (!authorized) {
      res.status(401).send('invalid token');
      return;
    }
    res.locals.userId = authorized.userId;
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

const paginate = (array, pageNumber, pageSize) =>
  array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);

// Get all transactions for given card
app.post('/account-activity', checkAuthorization, (req, res) => {
  const { body } = req;
  const {
    cardId,
    pageRequest: { pageNumber, pageSize },
  } = body;

  const cardTransactions = transactions.filter((t) => t.card?.cardId === cardId) || [];
  const totalElements = cardTransactions.length || 0;
  const pagedTransactions = paginate(cardTransactions, pageNumber, pageSize);

  const response = {
    pageNumber,
    pageSize,
    totalElements,
    content: pagedTransactions || [],
  };

  res.json(response);
});

// Get single transaction info
app.get('/users/account-activity/:accountActivityId', checkAuthorization, (req, res) => {
  const { params } = req;
  const { accountActivityId } = params;

  const cardTransaction = transactions.find((t) => t.accountActivityId === accountActivityId);

  res.json(cardTransaction);
});

// Block (freeze) card
app.patch('/users/cards/:cardId/block', (req, res) => {
  const { params } = req;
  const { cardId } = params;

  const idx = usersCards.findIndex((c) => c.card.cardId === cardId);
  const cardItem = usersCards[idx];
  const { card } = cardItem;

  const modifiedCard = { ...cardItem, card: { ...card, ...{ status: 'INACTIVE' } } };

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

app.patch('/users/cards/activate', (req, res) => {
  const {
    body: { lastFour },
  } = req;

  const idx = usersCards.findIndex(
    (c) =>
      c.card.cardNumber.slice(c.card.cardNumber.length - 4, c.card.cardNumber.length) === lastFour,
  );
  const cardItem = usersCards[idx];

  if (!cardItem) {
    setTimeout(() => res.status(404).send('Not found'), 750);
  } else {
    const { card } = cardItem;

    const updatedCard = {
      ...cardItem,
      card: { ...card, ...{ status: 'ACTIVE', activated: true } },
    };

    usersCards[idx] = updatedCard;
    res.json(updatedCard.card);
  }
});

app.post('/users/account-activity/:accountActivityId/receipts/:receiptId/link', (req, res) => {
  const { params } = req;
  const { accountActivityId, receiptId } = params;

  const transactionIdx = transactions.findIndex((x) => x.accountActivityId === accountActivityId);
  const transaction = transactions[transactionIdx];

  let receiptIds = transaction.receipt?.receiptId;

  if (receiptIds?.find((x) => x === receiptId)) {
    return res.status(500).send('ReceiptId already linked to this transaction');
  }

  if (!receiptIds) {
    receiptIds = [];
  }

  receiptIds.push(receiptId);

  const newTransactionWithReceiptUpdated = {
    ...transaction,
    receipt: {
      receiptId: receiptIds,
    },
  };

  transactions[transactionIdx] = newTransactionWithReceiptUpdated;

  res.json(newTransactionWithReceiptUpdated);
});

app.patch(`/users/account-activity/:accountActivityId`, (req, res) => {
  const { params, body } = req;
  const { accountActivityId } = params;
  const { notes } = body;

  const transactionIdx = transactions.findIndex((x) => x.accountActivityId === accountActivityId);
  if (transactionIdx === -1) {
    res.sendStatus(404);
    return;
  }

  const transaction = transactions[transactionIdx];

  const updated = {
    ...transaction,
    notes,
  };

  transactions[transactionIdx] = updated;

  res.status(200).json(updated);
});

app.delete('/users/receipts/:receiptId/delete', (req, res) => {
  const { params } = req;
  const { receiptId } = params;

  // need to unlink from transaction first
  const transactionIdx = transactions.findIndex((x) =>
    x.receipt?.receiptId.some((y) => y === receiptId),
  );

  if (transactionIdx === -1) {
    res.sendStatus(404);
    return;
  }

  const transaction = transactions[transactionIdx];
  const receiptIdsUpdated = transaction.receipt.receiptId.filter((x) => x !== receiptId);

  const transactionUpdated = {
    ...transaction,
    receipt: {
      receiptId: receiptIdsUpdated,
    },
  };
  transactions[transactionIdx] = transactionUpdated;

  res.sendStatus(200);
});

app.get('/users/', checkAuthorization, (req, res) => {
  const { userId } = res.locals;
  const currentUser = users.find((x) => x.profile.userId === userId);

  res.json(currentUser.profile);
});

app.use('/images', images);

app.listen(port, () => {
  console.log(`REST server listening on port ${port}!`);
});

exitHook((callback) => {
  console.log('cleaning up uploads...');
  const uploadPath = `${__dirname}/uploads`;

  const typesToDelete = ['jpg', 'jpeg', 'png', 'pdf'];
  fs.readdir(uploadPath, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      if (typesToDelete.find((t) => file.endsWith(t))) {
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
