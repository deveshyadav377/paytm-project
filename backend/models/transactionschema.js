const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  method: {
    type: String,
    enum: ['WALLET', 'RAZORPAY', 'BANK_TRANSFER'],
    default: 'WALLET'
  },
  status: {
    type: String,
    enum: ['SUCCESS', 'FAILED'],
    default: 'SUCCESS'
  }
});

module.exports = mongoose.model("Transaction", transactionSchema);
