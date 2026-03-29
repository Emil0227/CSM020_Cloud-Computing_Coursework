// import Express and validation utilities
const express = require('express');
const { body, param, validationResult } = require('express-validator');

// import middleware and controller modules
const requireAuth = require('../middleware/auth');
const posts = require('../controllers/posts.controller');
const validate = require('../middleware/validate');

// create router instance for /posts endpoints
const router = express.Router();

// POST /posts
// create post
// require authentication and input validation
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

// GET /posts
// read all posts (sorting logic is implemented in controller)
// require authentication
router.get('/', requireAuth, posts.listPosts);

// GET /posts/:postId
// read a single post
// require authentication and postId validation
router.get(
  '/:postId',
  requireAuth,
  [param('postId').isMongoId(), validate],
  posts.getPost
);

// PUT /posts/:postId
// update post
// require authentication and input validation
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

// DELETE /posts/:postId
// delete post
// require authentication and postId validation
router.delete(
  '/:postId',
  requireAuth,
  [param('postId').isMongoId(), validate],
  posts.deletePost
);

// export router to be used in the main application
module.exports = router;