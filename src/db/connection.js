const mysql = require('mysql');
require('dotenv').config()
const DATABASE = process.env.DB_NAME || 'delilah_resto'  ;

const con  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : DATABASE
});

module.exports = con;