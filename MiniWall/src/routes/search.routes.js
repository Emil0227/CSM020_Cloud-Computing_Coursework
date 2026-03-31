// import Express and validation utilities
const express = require('express');
const { query, validationResult } = require('express-validator');

// import middleware and controller modules
const requireAuth = require('../middleware/auth');
const searchController = require('../controllers/search.controller');
const validate = require('../middleware/validate');

// create router instance for /posts endpoints
const router = express.Router();

// GET /search
// search posts
// require authentication and input validation
router.get(
  '/search',
  requireAuth,
  [
    query('keyword').optional().isString().trim().isLength({ min: 1, max: 50 }), // validate optional keyword parameter
    query('owner').optional().isMongoId(), // validate optional owner parameter (must be a valid MongoDB ObjectId)
    // validate optional start and end dates (must be valid ISO8601 format)
    query('startDate').optional().isISO8601(), 
    query('endDate').optional().isISO8601(), 
    validate,
  ],
  searchController.searchPosts
);

// export router to be used in the main application
module.exports = router;