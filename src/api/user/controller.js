const { requestErrors } = require('../../utils/utilis');
const { createUser : createUserEntity } = require('./entity');

const statusController = async (req, res) => {
    try {
        const hola = {
            "message": "Heeeeello"
        }
        res.status(200).send(hola);
    } catch (err) {
        res.status(500).send({
            status: err.message
        });
    }
};

const createUser = async (req, res) => {
    requestErrors(req, res);
    try {
        const create = createUserEntity(req.body);
        create.then(r =>{
            res.status(200).send({
                data: { message : "User created correctly" }
            });
        }).catch((error) => {
            res.status(500).send({
                error: error.sqlMessage
            });
        });
        
    } catch (error) {
        res.status(500).send({
            status: error.message
        });
    }
};

const loginUser = async (req, res)=> {
    requestErrors(req, res);
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    statusController,
    createUser,
    loginUser
};