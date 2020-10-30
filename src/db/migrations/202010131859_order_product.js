const con = require('../connection');
require('dotenv').config();
const DATABASE =  process.env.DB_NAME ||  'delilah_resto' ;

var sql = "CREATE TABLE IF NOT EXISTS " + DATABASE + ".orders_products( id bigint(20) unsigned NOT NULL AUTO_INCREMENT, order_id bigint(20) unsigned NOT NULL, product_id bigint(20) unsigned NOT NULL, quantity int(11) NOT NULL DEFAULT 1, status_id bigint(20) unsigned DEFAULT NULL, created_at timestamp NULL DEFAULT NULL, updated_at timestamp NULL DEFAULT NULL, PRIMARY KEY (id), KEY orders_products_fk (order_id), KEY orders_products_fk_1 (product_id), KEY orders_products_fk_2 (status_id), CONSTRAINT orders_products_fk FOREIGN KEY (order_id) REFERENCES orders (id), CONSTRAINT orders_products_fk_1 FOREIGN KEY (product_id) REFERENCES products (id), CONSTRAINT orders_products_fk_2 FOREIGN KEY (status_id) REFERENCES statuses (id)) ENGINE=InnoDB DEFAULT CHARSET=latin1"
con.query(sql, function (error, results, fields) {
    console.log("Table orders_products created");
});