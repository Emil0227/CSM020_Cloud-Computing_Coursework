// import Post model to interact with MongoDB posts collection
const Post = require('../models/Post');

// create a new post
// requires authenticated user (owner is taken from req.user set by auth middleware)
exports.createPost = async (req, res) => {
  const { title, description } = req.body;

  const post = await Post.create({
    title,
    description,
    owner: req.user.id,
  });

  res.status(201).json(post);
};

// retrieve all posts
// applies required sorting: first by likes (descending), then by creation time (latest first)
exports.listPosts = async (req, res) => {
  const posts = await Post.find()
    .populate('owner', 'email displayName')
    .sort({ likesCount: -1, createdAt: -1 });
  res.json(posts);
};

// retrieve a single post by ID
exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.postId).populate('owner', 'email displayName');
  if (!post) return res.status(404).json({ message: 'Post not found' }); // return 404 if post does not exist
  res.json(post);
};

// update an existing post
exports.updatePost = async (req, res) => {
  const { title, description } = req.body;

  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  // only owner can update
  if (post.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Only the owner can update this post' });
  }

  if (title !== undefined) post.title = title;
  if (description !== undefined) post.description = description;

  await post.save();
  res.json(post);
};

// delete a post
exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  // only owner can delete
  if (post.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Only the owner can delete this post' });
  }

  await post.deleteOne();
  res.json({ message: 'Post deleted' });
};