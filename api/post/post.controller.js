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

function getPostsInDB() {
    return new Promise((resolve, reject) => {
        const query = Post.find({});
        query.exec((err, posts) => {
            if (posts) {
                resolve(posts);
            } else {
                reject("Posts not found in database");
            }
        });
    });
}

PostController.createPost = function (req, res, next) {
    const data = req.body.data;

    utils.extractFields(data, CreatePostFields)
        .then(createPostInDB)
        .then((post) => {
            res.status(201).send({
                data: {
                    id: post.id,
                    created_at: post.created_at
                }
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
};

PostController.deletePost = function (req, res, next) {
    const data = {
        id: req.params.id
    };

    utils.extractFields(data, DeletePostFields)
        .then(deletePostInDB)
        .then((post) => {
            res.status(200).send({
                data: {
                    id: post._id
                }
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
};

PostController.getAllPosts = function (req, res, next) {
    getPostsInDB()
        .then((posts) => {
            res.status(200).send({
                data: posts
            })
        })
        .catch((err) => {
            res.status(404).send({
                errors: [{
                    title: "Posts could not be found",
                    detail: err
                }]
            })
        });
};

module.exports = PostController;
