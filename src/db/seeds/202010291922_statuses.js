const con = require("../connection");
require("dotenv").config();
const DATABASE = process.env.DB_NAME || "delilah_resto";

var sql = [
    `INSERT INTO ${DATABASE}.statuses(name, created_at, updated_at) VALUES('New', NULL, NULL);`,
    `INSERT INTO ${DATABASE}.statuses(name, created_at, updated_at) VALUES('Confirmed', NULL, NULL);`,
    `INSERT INTO ${DATABASE}.statuses(name, created_at, updated_at) VALUES('Preparing', NULL, NULL);`,
    `INSERT INTO ${DATABASE}.statuses (name, created_at, updated_at) VALUES('Sent', NULL, NULL);`,
    `INSERT INTO ${DATABASE}.statuses (name, created_at, updated_at) VALUES('Delivered', NULL, NULL);`,
    `INSERT INTO ${DATABASE}.statuses (name, created_at, updated_at) VALUES('Canceled', NULL, NULL);`
];
sql.forEach((query)=>{
    con.query(query, function (error, results, fields) {
        console.log("Statuses migrated");
    });
});

