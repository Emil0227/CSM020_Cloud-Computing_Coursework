const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const healthRoutes = require('./routes/health.routes');
const postsRoutes = require('./routes/posts.routes');
const usersRoutes = require('./routes/users.routes');
const commentsRoutes = require('./routes/comments.routes');
const likesRoutes = require('./routes/likes.routes');

console.log('healthRoutes:', typeof healthRoutes, healthRoutes);
console.log('postsRoutes:', typeof postsRoutes, postsRoutes);
console.log('usersRoutes:', typeof usersRoutes, usersRoutes);
console.log('commentsRoutes:', typeof commentsRoutes, commentsRoutes);
console.log('likesRoutes:', typeof likesRoutes, likesRoutes);

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/', healthRoutes);
app.use('/posts', postsRoutes);
app.use('/users', usersRoutes);
app.use('/', commentsRoutes);
app.use('/', likesRoutes);

module.exports = app;
