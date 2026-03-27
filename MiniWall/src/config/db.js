// import Mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// establish a connection to the MongoDB database
async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI is missing in .env');

  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);

  console.log('MongoDB connected');
}

// export the function so it can be reused in the main application entry point app.js
module.exports = connectDB;