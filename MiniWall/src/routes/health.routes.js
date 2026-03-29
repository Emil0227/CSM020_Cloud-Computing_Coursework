// import Express and validation utilities
const express = require('express');
const router = express.Router();

// basic endpoint (root)
router.get('/', (req, res) => {
  res.json({ message: 'MiniWall API running' });
});

// health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'MiniWall' });
});

// export router to be used in the main application
module.exports = router;