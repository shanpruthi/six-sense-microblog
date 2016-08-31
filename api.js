'use strict';

const apiRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const config = require('./api/common/config');

const postRouter = require('./api/post/post.router');
const userRouter = require('./api/user/auth.router.js');

apiRouter.use((req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    errors: [
                        {
                            title: 'Invalid token',
                            detail: 'Valid JSON Web Token required to communicate with API'
                        }
                    ]
                })
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.status(403).send({
            errors: [
                {
                    title: 'Missing token',
                    detail: 'Valid JSON Web Token required to communicate with API'
                }
            ]
        })
    }
});

apiRouter.use('/user', userRouter);
apiRouter.use('/post', postRouter);

module.exports = apiRouter;
