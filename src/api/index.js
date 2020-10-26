const express = require('express');
const genericRoutes = express.Router();
const user = require('./user');
const product = require('./product');
const order = require('./order');
const { createUser, loginUser } = require("./user/controller");
const { validate } = require("./user/functions");


genericRoutes.use('/user', user);
genericRoutes.use('/product', product);
genericRoutes.use('/order', order);
genericRoutes.use('/signin',validate('createUser'), createUser);
genericRoutes.use('/login',validate('loginUser'), loginUser);

module.exports = genericRoutes;