console.log('>>> comments.controller.js TOP loaded');

const Comment = require('../models/Comment');
const Post = require('../models/Post');

console.log('>>> comments.controller models loaded');

exports.addComment = async (req, res) => {
  const { text } = req.body;
  const { postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  if (post.owner.toString() === req.user.id) {
    return res.status(403).json({ message: 'Post owner cannot comment on own post' });
  }

  const comment = await Comment.create({
    post: postId,
    owner: req.user.id,
    text,
  });

  res.status(201).json(comment);
};

exports.listComments = async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ post: postId })
    .populate('owner', 'email displayName')
    .sort({ createdAt: 1 });

  res.json(comments);
};

exports.updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  const comment = await Comment.findById(commentId);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });

  if (comment.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Only the comment owner can update' });
  }

  comment.text = text;
  await comment.save();
  res.json(comment);
};

exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });

  if (comment.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Only the comment owner can delete' });
  }

  await comment.deleteOne();
  res.json({ message: 'Comment deleted' });
};

console.log('>>> comments.controller.js BOTTOM loaded');
console.log('>>> exports keys =', Object.keys(module.exports));