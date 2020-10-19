'use strict'

const jwt = require('jsonwebtoken');
require('dotenv').config();

function createToken(data) {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: data
    }, process.env.PRIVATE_KEY);
    
}

module.exports = {
    createToken
}