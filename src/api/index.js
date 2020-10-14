const express = require('express');
const genericRoutes = express.Router();
const user = require('./user');

genericRoutes.use('/user', user);

module.exports = genericRoutes;