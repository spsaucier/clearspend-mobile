const express = require('express');
const uuid = require('uuid');
const router = express.Router();

const uploadPath = __dirname + '/uploads/';
var uploadedReceipts = [];

router.post('/receipts', (req, res) => {
  const { files } = req;
  const { receipt } = files;
  const { name } = receipt;

  receipt.mv(`${uploadPath}${name}`, (err) => {
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

  const receipt = uploadedReceipts.find((x) => x.receiptId === receiptId);
  const { fileName } = receipt;

  res.set('Content-Type', 'image/application/octet-stream');
  return res.sendFile(`${uploadPath}${fileName}`);
});

module.exports = router;
