const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

con.connect(function (err) {
    con.query("CREATE DATABASE IF NOT EXISTS delilah_resto", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});


module.exports = con;