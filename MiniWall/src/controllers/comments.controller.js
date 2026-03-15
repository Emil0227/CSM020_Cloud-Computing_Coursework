const Comment = require('../models/Comment');
const Post = require('../models/Post');

/**
 * Add a comment to a post
 * Rule: post owner cannot comment on their own post
 */
exports.addComment = async (req, res) => {
  const { text } = req.body;
  const { postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (post.owner.toString() === req.user.id) {
    return res.status(403).json({ message: 'Post owner cannot comment on own post' });
  }

  const comment = await Comment.create({
    post: postId,
    owner: req.user.id,
    text,
  });

  return res.status(201).json(comment);
};

/**
 * Get all comments for a post
 */
exports.listComments = async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ post: postId })
    .populate('owner', 'email displayName')
    .sort({ createdAt: 1 });

  return res.json(comments);
};

/**
 * Update a comment
 * Rule: only the comment owner can update it
 */
exports.updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  if (comment.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Only the comment owner can update' });
  }

  comment.text = text;
  await comment.save();

  return res.json(comment);
};

/**
 * Delete a comment
 * Rule: only the comment owner can delete it
 */
exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  if (comment.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Only the comment owner can delete' });
  }

  await comment.deleteOne();

  return res.json({ message: 'Comment deleted' });
};