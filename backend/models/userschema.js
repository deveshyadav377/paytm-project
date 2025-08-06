const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  legalName: { type: String, default: "" },
  email: { type: String, default: "" },
  country: { type: String, default: "" },
  dob: { type: Date },

  // Preferences
  language: { type: String, default: "English" },
  currency: { type: String, default: "INR" },
  timezone: { type: String, default: "+05:30" },
  autoLogout: { type: String, default: "8 hours" }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
