'use strict'

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const validate = (method) => {
  switch (method) {
    case 'createUser': {
     return [ 
        body('fullname', 'fullname does not exists').exists(),
        body('nick', 'nick does not exists').exists(),
        body('email', 'Invalid email').exists().isEmail(),
        body('address', 'address does not exists').exists(),
        body('phone', 'phone does not exists or the format is incorrect').isInt().exists(),
        body('password', 'password does not exists').exists(),
       ]
    }
    case 'loginUser': {
      return [ 
         body('user', 'user does not exists').exists(),
         body('password', 'password does not exists').exists(),
        ]   
     }
  }
}

const validatePassword = ({ password }, loginPassword) => {
  if(!password || !loginPassword) return false;
  return bcrypt.compareSync(loginPassword, password);
}

module.exports = {
  validate,
  validatePassword
}