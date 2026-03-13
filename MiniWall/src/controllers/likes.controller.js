const Like = require('../models/Like');
const Post = require('../models/Post');

exports.likePost = async (req, res) => {
  const { postId } = req.params;

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
    // duplicate like hits unique index
    return res.status(409).json({ message: 'Already liked' });
  }
};

exports.unlikePost = async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const deleted = await Like.findOneAndDelete({ post: postId, user: req.user.id });
  if (!deleted) return res.status(404).json({ message: 'Like not found' });

  post.likesCount = Math.max(0, post.likesCount - 1);
  await post.save();

  res.json({ message: 'Unliked', likesCount: post.likesCount });
};