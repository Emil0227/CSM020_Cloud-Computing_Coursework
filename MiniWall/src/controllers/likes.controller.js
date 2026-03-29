// import Like and Post models to interact with MongoDB collections
const Like = require('../models/Like');
const Post = require('../models/Post');

// like a post
// require authenticated user (owner is taken from req.user set by auth middleware)
exports.likePost = async (req, res) => {
  const { postId } = req.params;

  // ensure the post exists
  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  // owner cannot like own post
  if (post.owner.toString() === req.user.id) {
    return res.status(403).json({ message: 'Post owner cannot like own post' });
  }

  try {
    await Like.create({ post: postId, user: req.user.id });
    post.likesCount += 1;
    await post.save();
    res.status(201).json({ message: 'Liked', likesCount: post.likesCount });
  } catch (err) {
    // handle duplicate likes (triggered by unique index constraint)
    return res.status(409).json({ message: 'Already liked' });
  }
};

// unlike a post
exports.unlikePost = async (req, res) => {
  const { postId } = req.params;

  // ensure the post exists
  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const deleted = await Like.findOneAndDelete({ post: postId, user: req.user.id }); // remove the like record
  if (!deleted) return res.status(404).json({ message: 'Like not found' }); // if no like was found, return an error

  // decrease the denormalised likes counter to ensure it does not go below zero
  post.likesCount = Math.max(0, post.likesCount - 1);
  await post.save();

  res.json({ message: 'Unliked', likesCount: post.likesCount });
};