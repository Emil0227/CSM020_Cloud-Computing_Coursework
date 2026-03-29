// import Express and validation utilities
const express = require('express');
const { param, validationResult } = require('express-validator');

// import middleware and controller modules
const requireAuth = require('../middleware/auth');
const likes = require('../controllers/likes.controller');
const validate = require('../middleware/validate');

// create router instance for like-related endpoints
const router = express.Router();

// POST /posts/:postId/like
// like a post
// require authentication and postId validation
router.post(
  '/posts/:postId/like',
  requireAuth,
  [param('postId').isMongoId(), validate],
  likes.likePost
);

// DELETE /posts/:postId/like
// unlike a post
// require authentication and postId validation
router.delete(
  '/posts/:postId/like',
  requireAuth,
  [param('postId').isMongoId(), validate],
  likes.unlikePost
);

// export router to be used in the main application
module.exports = router;