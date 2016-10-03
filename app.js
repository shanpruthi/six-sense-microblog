'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const authRouter = require('./api/user/auth.router');
const apiRouter = require('./api.js');

const config = require('./api/common/config');
const db = require('./api/common/db');

const app = express();

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/client'));
app.use('/api/auth', authRouter);
app.use('/api', apiRouter);

app.listen(3000);
console.log('App is running');
