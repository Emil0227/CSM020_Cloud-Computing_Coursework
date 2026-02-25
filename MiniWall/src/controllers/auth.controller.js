const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

exports.register = async (req, res) => {
  const { email, password, displayName } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already registered' });

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ email, passwordHash, displayName });

  const token = signToken(user);
  return res.status(201).json({
    message: 'Registered',
    token,
    user: { id: user._id, email: user.email, displayName: user.displayName }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken(user);
  return res.status(200).json({
    message: 'Logged in',
    token,
    user: { id: user._id, email: user.email, displayName: user.displayName }
  });
};

exports.me = async (req, res) => {
  return res.json({ user: req.user });
};