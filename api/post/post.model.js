'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const db = require('../common/db');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        max: [160, 'Content of post cannot exceed 160 characters']
    },
    author: ObjectId,
    image: {
        data: Buffer,
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Post = db.model('Post', PostSchema);

module.exports = Post;
