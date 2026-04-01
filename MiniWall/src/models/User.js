// Based on CSM020 Lab 4 tutorial
// Custom implementation for MiniWall project

// import Mongoose to define schema and interact with MongoDB
const mongoose = require('mongoose');

// define the schema for User collection
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true }, // user email address
    passwordHash: { type: String, required: true }, // store hashed password instead of plain text for security reasons
    displayName: { type: String, required: true, trim: true, minlength: 2, maxlength: 30 }, // display name for the user
  },
  { timestamps: true } // automatically add createdAt and updatedAt timestamps
);

// export the model for use in controllers and services
module.exports = mongoose.model('User', userSchema);