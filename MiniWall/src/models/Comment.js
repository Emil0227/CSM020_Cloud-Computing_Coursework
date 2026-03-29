// import Mongoose to define schema and interact with MongoDB
const mongoose = require('mongoose');

// define the schema for Post collection
const commentSchema = new mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true, trim: true, maxlength: 500 },
  },
  { timestamps: true } // createdAt, updatedAt (timestamp requirement)
);

// export the model for use in controllers and services
module.exports = mongoose.model('Comment', commentSchema);