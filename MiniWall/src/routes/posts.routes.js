const express = require('express');
const { body, param, validationResult } = require('express-validator');

const requireAuth = require('../middleware/auth');
const posts = require('../controllers/posts.controller');

const router = express.Router();
const validate = require('../middleware/validate');

// Create post
router.post(
  '/',
  requireAuth,
  [
    body('title').isString().trim().isLength({ min: 1, max: 80 }),
    body('description').isString().trim().isLength({ min: 1, max: 1000 }),
    validate,
  ],
  posts.createPost
);

// Read all posts(sorted by likesCount desc, createdAt desc)
router.get('/', requireAuth, posts.listPosts);

// Read one post
router.get(
  '/:postId',
  requireAuth,
  [param('postId').isMongoId(), validate],
  posts.getPost
);

// Update post
router.put(
  '/:postId',
  requireAuth,
  [
    param('postId').isMongoId(),
    body('title').optional().isString().trim().isLength({ min: 1, max: 80 }),
    body('description').optional().isString().trim().isLength({ min: 1, max: 1000 }),
    validate,
  ],
  posts.updatePost
);

// Delete post
router.delete(
  '/:postId',
  requireAuth,
  [param('postId').isMongoId(), validate],
  posts.deletePost
);

module.exports = router;