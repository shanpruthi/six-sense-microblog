'use strict';

const PostRouter = require('express').Router();
const PostController = require('./post.controller');

PostRouter.post('/', PostController.createPost);
PostRouter.get('/', PostController.getAllPosts);
PostRouter.delete('/:id', PostController.deletePost);

module.exports = PostRouter;
