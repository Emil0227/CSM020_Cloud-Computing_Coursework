const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const healthRoutes = require('./routes/health.routes');
const authRoutes = require('./routes/auth.routes');
const postsRoutes = require('./routes/posts.routes');

const app = express();            

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/', healthRoutes);
app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);

module.exports = app;