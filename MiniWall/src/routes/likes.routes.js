const express = require('express');
const { param, validationResult } = require('express-validator');

const requireAuth = require('../middleware/auth');
const likes = require('../controllers/likes.controller');

const router = express.Router();

const validate = require('../middleware/validate');

router.post(
  '/posts/:postId/like',
  requireAuth,
  [param('postId').isMongoId(), validate],
  likes.likePost
);

router.delete(
  '/posts/:postId/like',
  requireAuth,
  [param('postId').isMongoId(), validate],
  likes.unlikePost
);

module.exports = router;