'use strict'
const con = require('../../db/connection');
require('dotenv').config();
const DATABASE = process.env.DB_NAME;
const bcrypt = require('bcrypt');
const { createToken } = require('../../utils/services/auth');
const { validatePassword } = require('./functions');

const createUser = async ({ fullname,nick,email,address,phone,password }) =>{
    const passwordHash = bcrypt.hashSync(password, 10);
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
    return new Promise(function(resolve, reject){
        let sql = `SELECT * FROM ${DATABASE}.users where nick= '${user}' or email= '${user}'`;
        con.query(
            sql, 
            function(err, rows){                                                
                if(rows){
                    if(validatePassword(rows[0],password)){
                        const { id, nick, isAdmin } = rows[0];
                        resolve(createToken({id, nick, isAdmin}));
                    }else{
                        reject({ error: "Credentials are not valid" });
                    }
                    
                }else{
                    reject({ error: "User not found" });
                }
            }
        );
    });
}


module.exports = {
    createUser,
    loginUser
}