const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateCredentialsInput = (email, password, options = {}) => {
  const { enforcePasswordLength = false } = options;

  if (!email || !password) {
    return { message: "Email and password are required" };
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return { message: "Email and password must be strings" };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  if (!normalizedEmail || !trimmedPassword) {
    return { message: "Email and password are required" };
  }

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return { message: "Invalid email format" };
  }

  if (enforcePasswordLength && trimmedPassword.length < 6) {
    return { message: "Password must be at least 6 characters" };
  }

  return { normalizedEmail, trimmedPassword };
};

const formatUserResponse = (user) => ({
  id: user._id,
  email: user.email,
});

const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const credentials = validateCredentialsInput(email, password, { enforcePasswordLength: true });

    if (credentials.message) {
      return res.status(400).json({ message: credentials.message });
    }

    const { normalizedEmail, trimmedPassword } = credentials;

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(trimmedPassword, SALT_ROUNDS);
    const user = await User.create({ email: normalizedEmail, password: hashedPassword });

    return res.status(201).json({
      message: "User registered successfully",
      user: formatUserResponse(user),
    });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const credentials = validateCredentialsInput(email, password);

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET is not configured" });
    }

    if (credentials.message) {
      return res.status(400).json({ message: credentials.message });
    }

    const { normalizedEmail, trimmedPassword } = credentials;

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(trimmedPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: formatUserResponse(user),
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
