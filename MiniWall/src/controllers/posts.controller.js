const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { title, description } = req.body;

  const post = await Post.create({
    title,
    description,
    owner: req.user.id,
  });

  res.status(201).json(post);
};

exports.listPosts = async (req, res) => {
  const posts = await Post.find()
    .populate('owner', 'email displayName')
    .sort({ likesCount: -1, createdAt: -1 }); // required sorting rule
  res.json(posts);
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.postId).populate('owner', 'email displayName');
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};

exports.updatePost = async (req, res) => {
  const { title, description } = req.body;

  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  // Only owner can update (good improvise)
  if (post.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Only the owner can update this post' });
  }

  if (title !== undefined) post.title = title;
  if (description !== undefined) post.description = description;

  await post.save();
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  if (post.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Only the owner can delete this post' });
  }

  await post.deleteOne();
  res.json({ message: 'Post deleted' });
};