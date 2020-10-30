const con = require('../connection');
require('dotenv').config();
const DATABASE =  process.env.DB_NAME ||  'delilah_resto' ;

var sql = "CREATE TABLE IF NOT EXISTS " + DATABASE + ".statuses( id bigint(20) unsigned NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, created_at timestamp NULL DEFAULT NULL, updated_at timestamp NULL DEFAULT NULL, PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=latin1"
con.query(sql, function (error, results, fields) {
    console.log("Table statuses created");
});