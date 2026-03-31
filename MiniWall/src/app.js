// Based on CSM020 Lab 2 tutorial
// Custom implementation for MiniWall project

// import core libraries
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// import routes
const healthRoutes = require('./routes/health.routes');
const usersRoutes = require('./routes/users.routes');
const postsRoutes = require('./routes/posts.routes');
const commentsRoutes = require('./routes/comments.routes');
const likesRoutes = require('./routes/likes.routes');
const searchRoutes = require('./routes/search.routes');

// create app
const app = express();

// global middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/', healthRoutes);
app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);
app.use('/posts', searchRoutes);

// nested resource routes
app.use('/', commentsRoutes);
app.use('/', likesRoutes);

// export app
module.exports = app;