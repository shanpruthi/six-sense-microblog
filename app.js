'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = require('./api.js');

const app = express();

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/client'));
app.use('/api', apiRouter);

app.listen(3000);
