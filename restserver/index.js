const express = require('express');

const auth = require('./resources/auth.json');
const usersCards = require('./resources/usersCards.json');
const transactions = require('./resources/transactions.json');

const app = express();
app.use(
  express.urlencoded({
    extended: true,
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
  const { type, dateFrom, dateTo, pageRequest } = query;

  const card = transactions.find((x) => x.cardId === cardId);
  res.json(card.response);
});

// Get single transaction info
app.get('/users/account-activity/:accountActivityId', checkAuthorization, (req, res) => {
  const { params } = req;
  const { accountActivityId } = params;
  const trxns = transactions[0].response.content;
  const transaction = trxns.find((x) => x.accountActivityId === accountActivityId);
  res.json(transaction);
});

app.listen(port, () => {
  console.log(`REST server listening on port ${port}!`);
});
