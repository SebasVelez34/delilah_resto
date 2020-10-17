const { body, validationResult } = require('express-validator');

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

module.exports = {
  validate
}