'use strict';

const apiRouter = require('express').Router();

module.exports = apiRouter;

const postRouter = require('./api/post/post.router');
const authRouter = require('./api/auth/auth.router');

apiRouter.use('/auth', authRouter);
apiRouter.use('/post', postRouter);

