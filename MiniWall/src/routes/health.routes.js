const express = require('express');
const router = express.Router();

// Basic endpoint (root)
router.get('/', (req, res) => {
  res.json({ message: 'MiniWall API running' });
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'MiniWall' });
});

module.exports = router;