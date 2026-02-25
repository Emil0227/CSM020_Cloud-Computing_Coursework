const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { register, login, me } = require('../controllers/auth.controller');
const requireAuth = require('../middleware/auth');

const router = express.Router();

// POST /auth/register
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 8, max: 64 }).withMessage('Password must be 8-64 chars'),
    body('displayName').isLength({ min: 2, max: 30 }).withMessage('displayName must be 2-30 chars')
  ],
  validate,
  register
);

// POST /auth/login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validate,
  login
);

// GET /auth/me (protected)
router.get('/me', requireAuth, me);

module.exports = router;