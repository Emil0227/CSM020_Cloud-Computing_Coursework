const express = require('express');
const { body, validationResult } = require('express-validator');
const authRequired = require('../middleware/auth');

const router = express.Router();

// GET /posts (protected)
router.get('/', authRequired, async (req, res) => {
  res.json({ message: 'You are authorised', user: req.user, posts: [] });
});

// POST /posts (protected + validation)
router.post(
  '/',
  authRequired,
  [
    body('title').isLength({ min: 1, max: 80 }).withMessage('Title 1-80 chars'),
    body('description').isLength({ min: 1, max: 1000 }).withMessage('Description 1-1000 chars'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // Phase C: save to MongoDB with owner=req.user.id
    res.status(201).json({
      message: 'Post accepted (DB save will be implemented in Phase C)',
      owner: req.user.id,
      data: req.body,
    });
  }
);

module.exports = router;