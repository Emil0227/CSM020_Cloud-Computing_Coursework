// import Mongoose to define schema and interact with MongoDB
const mongoose = require('mongoose');

// define the schema for Post collection
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // denormalised counter for sorting
    likesCount: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true } // createdAt, updatedAt (timestamp requirement)
);

// export the model for use in controllers and services
module.exports = mongoose.model('Post', postSchema);