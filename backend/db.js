require('dotenv').config();
const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("DB connection failed:", err.message);
  }
};

module.exports = connectToDB;
