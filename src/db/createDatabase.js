const con = require("./connection");
const DATABASE = 'delilah_resto' || process.env.DB_NAME ;

con.query("CREATE DATABASE IF NOT EXISTS " + DATABASE, function (error, results, fields) {
    console.log("Database created");
});