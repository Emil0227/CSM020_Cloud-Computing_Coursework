const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const healthRoutes = require('./routes/health.routes');
const postsRoutes = require('./routes/posts.routes');
const usersRoutes = require('./routes/users.routes');

const app = express();            

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/', healthRoutes);
app.use('/posts', postsRoutes);
app.use('/users', usersRoutes);

module.exports = app;
