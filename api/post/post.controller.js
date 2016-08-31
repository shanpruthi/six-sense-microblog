'use strict';

const _ = require('lodash');
const utils = require('../common/utils');

const Post = require('./post.model');

const PostController = {};

const CreatePostFields = [
    'title',
    'content',
    'image'
];
const DeletePostFields = [
    'id'
];

function createPostInDB(body) {
    const post = new Post(body);
    return post.save();
}

function deletePostInDB(body) {
    return Post.findByIdAndRemove(body.id);
}

PostController.createPost = function (req, res, next) {
    const data = req.body.data;

    utils.extractFields(data, CreatePostFields)
        .then(createPostInDB)
        .then((post) => {
            res.status(201).send({
                data: [{
                    id: post.id,
                    created_at: post.created_at
                }]
            });
        })
        .catch((err) => {
            res.status(400).send({
                errors: [{
                    title: "Post could not be created",
                    detail: err
                }]
            })
        });

    next();
};

PostController.deletePost = function (req, res, next) {
    const data = req.body.data;

    utils.extractFields(data, DeletePostFields)
        .then(deletePostInDB)
        .then((post) => {
            res.status(200).send({
                data: [{
                    id: post.id,
                    created_at: post.created_at
                }]
            });
        })
        .catch((err) => {
            res.status(403).send({
                errors: [{
                    title: "Post could not be deleted",
                    detail: err
                }]
            })
        });

    next();
};

module.exports = PostController;
