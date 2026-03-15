const express = require('express');
const { body, param } = require('express-validator');

const requireAuth = require('../middleware/auth');
const comments = require('../controllers/comments.controller');
const validate = require('../middleware/validate');

const router = express.Router();

/*
  Comment Routes
  All routes require authentication.
*/

/**
 * Create a comment on a post
 * POST /posts/:postId/comments
 */
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

/**
 * Get comments for a post
 * GET /posts/:postId/comments
 */
router.get(
  '/posts/:postId/comments',
  requireAuth,
  param('postId').isMongoId(),
  validate,
  comments.listComments
);

/**
 * Update a comment
 * PUT /comments/:commentId
 */
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