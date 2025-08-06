const express = require('express');
const { authMiddleware } = require('../middleware');
const  Account  = require('../models/accountschema'); 
const mongoose = require('mongoose');
const Transaction = require('../models/transactionschema'); 
const { Reward } = require("../models/rewardSchema");

const router = express.Router();

// ✅ Get Balance
router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    });
});

// ✅ Transfer Money & Save Transaction
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, to } = req.body;

    const senderAcc = await Account.findOne({ userId: req.userId }).session(session);
    if (!senderAcc || senderAcc.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const receiverAcc = await Account.findOne({ userId: to }).session(session);
    if (!receiverAcc) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid recipient account" });
    }

    // Transfer amount
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Generate reward (₹1–₹100)
    const rewardAmount = Math.floor(Math.random() * 100) + 1;

    // Add reward to sender's balance
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: rewardAmount } }).session(session);

    // Create reward entry
    const reward = new Reward({
      user: req.userId,
      amount: rewardAmount
    });
    await reward.save({ session });

    await session.commitTransaction();

    res.json({
      message: "Transfer successful. Reward received!",
      reward: rewardAmount
    });

  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ message: "Something went wrong", error: err.message });
  } finally {
    session.endSession();
  }
});


// ✅ Get transaction history for a user
router.get("/transactions", authMiddleware, async (req, res) => {
    try {
        const transactions = await Transaction.find({
            $or: [
                { sender: req.userId },
                { receiver: req.userId }
            ]
        })
        .sort({ timestamp: -1 }) // newest first
        .populate("sender", "username")
        .populate("receiver", "username");

        res.json({ transactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch transactions" });
    }
});

// ✅ Get rewards for a user
router.get("/rewards", authMiddleware, async (req, res) => {
  try {
    const rewards = await Reward.find({ user: req.userId }).sort({ timestamp: -1 });
    res.json({ rewards });
  } catch (err) {
    res.status(500).json({ message: "Could not fetch rewards" });
  }
});
