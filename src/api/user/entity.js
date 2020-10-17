const con = require('../../db/connection');
require('dotenv').config();
const DATABASE = process.env.DB_NAME;
const bcrypt = require('bcrypt');

const createUser = async ({ fullname,nick,email,address,phone,password }) =>{
    const passwordHash = bcrypt.hashSync(password, 10);
    //const verified = bcrypt.compareSync(password, passwordHash);
    return new Promise(function(resolve, reject){
        let sql = `INSERT INTO ${DATABASE}.users (fullname, nick, email, address, phone, password) VALUES ('${fullname}','${nick}','${email}','${address}',${phone},'${passwordHash}')`;
        con.query(
            sql, 
            function(err, rows){                                                
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            }
        );
    });
}
const loginUser = async ({ user, password }) =>{

}


module.exports = {
    createUser,
    loginUser
}