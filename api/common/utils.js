'use strict';

const _ = require('lodash');

module.exports = {
    extractFields: function extractFields(body, fields) {
        return new Promise((resolve, reject) => {
            resolve(_.pick(body, fields));
        });
    },
    updateFields: function updateFields(body, updatedFieldsBody) {
        return new Promise((resolve, reject) => {
            resolve(_.assign(body, updatedFieldsBody));
        });
    }
};
