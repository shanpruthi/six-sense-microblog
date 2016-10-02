'use strict';

const _ = require('lodash');

module.exports = {
    extractFields: _.flow([_.pick, Promise.resolve]),
    updateFields: _.flow([_.assign, Promise.resolve])
};
