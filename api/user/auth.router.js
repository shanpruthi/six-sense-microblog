'use strict';

const AuthRouter = require('express').Router();
const AuthController = require('./auth.controller.js');

AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/register', AuthController.register);

module.exports = AuthRouter;
