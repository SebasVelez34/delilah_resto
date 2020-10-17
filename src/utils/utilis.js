const { validationResult } = require('express-validator');

const requestErrors = (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
}

module.exports = {
    requestErrors
}
