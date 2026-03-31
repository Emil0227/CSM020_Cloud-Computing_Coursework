// import Mongoose to define schema and interact with MongoDB
const mongoose = require('mongoose');

// define the schema for Post collection
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    // denormalised field for title keyword search
    titleKeywords: {type: [String], index: true},

    // denormalised counter for sorting
    likesCount: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true } // createdAt, updatedAt (timestamp requirement)
);

// pre-save hook to automatically generate titleKeywords
// ensure keywords are updated whenever a post is created or its title is modified
postSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.titleKeywords = this.title
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
  }

  next();
});

// additional indexes for search efficiency
postSchema.index({ owner: 1 });
postSchema.index({ createdAt: 1 });

// export the model for use in controllers and services
module.exports = mongoose.model('Post', postSchema);