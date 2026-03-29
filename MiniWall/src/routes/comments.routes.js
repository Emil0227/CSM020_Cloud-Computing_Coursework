// import Express and validation utilities
const express = require('express');
const { body, param } = require('express-validator');

// import middleware and controller modules
const requireAuth = require('../middleware/auth');
const comments = require('../controllers/comments.controller');
const validate = require('../middleware/validate');

// create router instance for comment-related endpoints
const router = express.Router();

// POST /posts/:postId/comments
// create a comment on a post
// require authentication, postId validation, and input validation
router.post(
  '/posts/:postId/comments',
  requireAuth,
  param('postId').isMongoId(),
  body('text')
    .isString()
    .trim()
    .isLength({ min: 1, max: 500 }),
  validate,
  comments.addComment
);

// GET /posts/:postId/comments
// get comments for a post
// require authentication and postId validation
router.get(
  '/posts/:postId/comments',
  requireAuth,
  param('postId').isMongoId(),
  validate,
  comments.listComments
);

// PUT /comments/:commentId
// update a comment
// require authentication, commentId validation, and input validation
router.put(
  '/comments/:commentId',
  requireAuth,
  param('commentId').isMongoId(),
  body('text')
    .isString()
    .trim()
    .isLength({ min: 1, max: 500 }),
  validate,
  comments.updateComment
);

/**
 * Delete a comment
 * DELETE /comments/:commentId
 */
router.delete(
  '/comments/:commentId',
  requireAuth,
  param('commentId').isMongoId(),
  validate,
  comments.deleteComment
);

module.exports = router;