const con = require('../connection');
const DATABASE = require('../../config/constants');

con.connect(function (err) {
    var sql = "CREATE TABLE IF NOT EXISTS " + DATABASE + ".statuses( id bigint(20) unsigned NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, created_at timestamp NULL DEFAULT NULL, updated_at timestamp NULL DEFAULT NULL, PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=latin1"
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table statuses created");
    });
});
module.exports = con;