const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  amount: Number,
  accountName: String,
  accountNumber: String,
  bankName: String,
  iban: String,
  swiftCode: String,
  description: String,
  accountType: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
})
const transfer = mongoose.model('transfer', transferSchema);

module.exports = transfer
