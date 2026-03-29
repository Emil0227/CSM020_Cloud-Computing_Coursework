// import Mongoose to define schema and interact with MongoDB
const mongoose = require('mongoose');

// define the schema for Like collection
const likeSchema = new mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true } // createdAt, updatedAt (timestamp requirement)
);

// prevent duplicate likes by same user on same post
likeSchema.index({ post: 1, user: 1 }, { unique: true });

// export the model for use in controllers and services
module.exports = mongoose.model('Like', likeSchema);