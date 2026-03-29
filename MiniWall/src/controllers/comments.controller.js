// import Comment and Post models to interact with MongoDB collections
const Comment = require('../models/Comment');
const Post = require('../models/Post');

// add a comment to a post
// require authenticated user (owner is taken from req.user set by auth middleware)
exports.addComment = async (req, res) => {
  const { text } = req.body;
  const { postId } = req.params;

  // check if the target post exists before creating a comment
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  // prevent post owner from commenting on their own post
  if (post.owner.toString() === req.user.id) {
    return res.status(403).json({ message: 'Post owner cannot comment on own post' });
  }

  // create and store the comment, linking it to both post and user
  const comment = await Comment.create({
    post: postId,
    owner: req.user.id,
    text,
  });

  return res.status(201).json(comment);
};

// get all comments for a post
exports.listComments = async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ post: postId })
    .populate('owner', 'email displayName')
    .sort({ createdAt: 1 });

  return res.json(comments);
};

// update a comment
exports.updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  // only owner can update
  if (comment.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Only the comment owner can update' });
  }

  comment.text = text;
  await comment.save();

  return res.json(comment);
};

// delete a comment
exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  // only owner can delete
  if (comment.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Only the comment owner can delete' });
  }

  await comment.deleteOne();

  return res.json({ message: 'Comment deleted' });
};