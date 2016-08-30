'use strict';

const PostRouter = require('express').Router();
const PostController = require('./post.controller');

PostRouter.post('/', PostController.createPost);
PostRouter.delete('/', PostController.deletePost);

module.exports = PostRouter;
