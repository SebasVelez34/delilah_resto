const mysql = require('mysql');
require('dotenv').config()
const DATABASE = 'delilah_resto' || process.env.DB_NAME ;

const con  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'delilah_resto'
});

module.exports = con;