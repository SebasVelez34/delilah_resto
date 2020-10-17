const con = require('../connection');
require('dotenv').config();
const DATABASE = 'delilah_resto' || process.env.DB_NAME ;

const sql = "CREATE TABLE IF NOT EXISTS " + DATABASE + ".users( id bigint(20) unsigned NOT NULL AUTO_INCREMENT, fullname varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL, nick varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL, email varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL, email_verified_at timestamp NULL DEFAULT NULL, address varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL, phone bigint(20) COLLATE utf8mb4_unicode_ci NOT NULL,isAdmin tinyint(1) NOT NULL DEFAULT 0, password varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL, remember_token varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL, created_at timestamp NULL DEFAULT NULL, updated_at timestamp NULL DEFAULT NULL, PRIMARY KEY (id), UNIQUE KEY users_email_unique (email), UNIQUE KEY users_nick_unique (nick)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"
con.query(sql, function (error, results, fields) {
    console.log("Table users created", error);
});