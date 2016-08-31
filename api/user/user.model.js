'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const db = require('../common/db');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        max: [160, 'Content of post cannot exceed 160 characters']
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const User = db.model('User', UserSchema);

module.exports = User;
