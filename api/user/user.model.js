'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const db = require('../common/db');
const redis = require('redis');
const redisClient = redis.createClient();

const MongooseRedis = require('mongoose-with-redis');

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

const cacheOptions = {
    cache: true,
    expires: 1440,
    prefix: 'RedisCache'
};
MongooseRedis(mongoose, redisClient, cacheOptions);

const User = db.model('User', UserSchema);

module.exports = User;
