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
      query.createdAt.$gte = new Date(`${startDate}T00:00:00.000Z`);
    }

    if (endDate) {
      
      query.createdAt.$lte = new Date(`${endDate}T23:59:59.999Z`);
    }
  }

  // execute query with populated user information
  // popular and recent posts appear first
  const posts = await Post.find(query)
    .populate('owner', 'email displayName')
    .sort({ likesCount: -1, createdAt: -1 });

  res.json(posts);
};