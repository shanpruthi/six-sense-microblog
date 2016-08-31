'use strict';

const mongoose = require('mongoose');

const config = require('./config');

const connection = mongoose.createConnection(config.database);

module.exports = connection;
