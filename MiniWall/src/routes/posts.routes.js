const express = require('express');
const requireAuth = require('../middleware/auth');

const router = express.Router();

// All posts endpoints are protected
router.use(requireAuth);

// GET /posts
router.get('/', async (req, res) => {
  // Phase C will query DB
  res.json({ message: 'Protected posts endpoint', user: req.user });
});

module.exports = router;