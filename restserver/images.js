const express = require('express');
const uuid = require('uuid');
const router = express.Router();

var uploadedReceipts = [];

router.post('/receipts', (req, res) => {
  const { files } = req;
  const { receipt } = files;
  const { name } = receipt;

  const uploadPath = __dirname + '/uploads/' + name;
  receipt.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);

    const receiptId = uuid.v4();

    const newEntry = {
      receiptId,
      fileName: name,
    };

    uploadedReceipts.push(newEntry);

    res.json({
      receiptId,
    });
  });
});

router.get('/receipts/:receiptId', (req, res) => {
  const { params } = req;
  const { receiptId } = params;

  return res.json(uploadedReceipts.find((x) => x.receiptId === receiptId));
});

module.exports = router;
