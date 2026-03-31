// import Post model to interact with MongoDB posts collection
const Post = require('../models/Post');

// search posts
exports.searchPosts = async (req, res) => {
  const { keyword, owner, startDate, endDate } = req.query;

  const query = {};

  // search by title keyword using denormalised field
  if (keyword) {
    query.titleKeywords = keyword.toLowerCase();
  }

  // search by owner
  if (owner) {
    query.owner = owner;
  }

  // search by date range
  if (startDate || endDate) {
    query.createdAt = {};

    if (startDate) {
      query.createdAt.$gte = new Date(startDate);
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      query.createdAt.$lte = end;
    }
  }

  // execute query with populated user information
  // popular and recent posts appear first
  const posts = await Post.find(query)
    .populate('owner', 'email displayName')
    .sort({ likesCount: -1, createdAt: -1 });

  res.json(posts);
};