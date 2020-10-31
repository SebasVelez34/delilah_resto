const con = require('../connection');
require('dotenv').config();
const DATABASE = process.env.DB_NAME || 'delilah_resto';

var sql = "CREATE TABLE IF NOT EXISTS " + DATABASE + ".orders( id bigint(20) unsigned NOT NULL AUTO_INCREMENT, user_id bigint(20) unsigned NOT NULL, payment_method enum('cash','credit card','other') NOT NULL, total bigint(20) NOT NULL, status_id bigint(20) unsigned NOT NULL, date date NOT NULL, time time NOT NULL, description text NOT NULL,isActive bool NOT NULL default true, created_at timestamp NULL DEFAULT NULL, updated_at timestamp NULL DEFAULT NULL, PRIMARY KEY (id), KEY orders_fk (status_id), KEY orders_fk_1 (user_id), CONSTRAINT orders_fk FOREIGN KEY (status_id) REFERENCES statuses (id), CONSTRAINT orders_fk_1 FOREIGN KEY (user_id) REFERENCES users (id)) ENGINE=InnoDB DEFAULT CHARSET=latin1"
con.query(sql, function (error, results, fields) {
    console.log("Table orders created");
});