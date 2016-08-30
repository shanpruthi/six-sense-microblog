'use strict';

const mongoose = require('mongoose');
const connection = mongoose.createConnection('mongodb://localhost:27017/blogdb');

module.exports = connection;
