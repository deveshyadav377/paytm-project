const express = require('express');
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const User = require('../models/userschema');
const Account = require('../models/accountschema');
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

// Signup input validation schema
const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(6)
});

// Signup Route
router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Invalid inputs"
    });
  }

  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken"
    });
  }

  const legalName = `${req.body.firstName} ${req.body.lastName}`;
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    legalName
  });

  const userId = user._id;

  await Account.create({
    userId,
    balance: Number((1 + Math.random() * 10000).toFixed(3))
  });

  const token = jwt.sign({
    userId,
    firstName: user.firstName,
    lastName: user.lastName
  }, JWT_SECRET);

  res.json({
    message: "User created successfully",
    token
  });
});

// Signin input validation schema
const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string()
});

// Signin Route
router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Invalid credentials"
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password
  });

  if (!user) {
    return res.status(411).json({
      message: "Email or password incorrect"
    });
  }

  const token = jwt.sign({
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName
  }, JWT_SECRET);

  res.json({ token });
});

// Update Profile input schema
const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  email: zod.string().email().optional(),
  country: zod.string().optional(),
  dob: zod.string().optional(),
  language: zod.string().optional(),
  currency: zod.string().optional(),
  timezone: zod.string().optional(),
  autoLogout: zod.string().optional()
});

// Update Profile Route
router.put("/profile", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Invalid update input"
    });
  }

  const updates = { ...req.body };

  // If name changes, update legalName
  if (updates.firstName || updates.lastName) {
    const user = await User.findById(req.userId);
    const firstName = updates.firstName || user.firstName;
    const lastName = updates.lastName || user.lastName;
    updates.legalName = `${firstName} ${lastName}`;
  }

  await User.updateOne({ _id: req.userId }, updates);

  res.json({
    message: "Profile updated successfully"
  });
});

// Get Profile Route
router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json({ user });
});

// Search Users (optional feature for filters)
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } }
    ]
  });

  res.json({
    users: users.map(user => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id
    }))
  });
});

module.exports = router;
