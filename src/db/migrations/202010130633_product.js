const con = require('../connection');
const DATABASE = require('../../config/constants');

con.connect(function (err) {
    var sql = "CREATE TABLE IF NOT EXISTS " + DATABASE + ".products( id BIGINT UNSIGNED auto_increment NOT null, name varchar(255) NOT NULL, image_path MEDIUMTEXT NULL, price BIGINT NOT NULL, creator_user_id BIGINT UNSIGNED NOT NULL, created_at TIMESTAMP DEFAULT NULL NULL, updated_at TIMESTAMP DEFAULT NULL NULL, primary key (id),CONSTRAINT products_fk FOREIGN KEY (creator_user_id) REFERENCES delilah_resto.users(id)) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;"
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table products created");
    });
});
module.exports = con;