const con = require("../../db/connection");
require("dotenv").config();
const DATABASE = process.env.DB_NAME;

const all = () => {
	return new Promise(function (resolve, reject) {
		let sql = `SELECT * FROM ${DATABASE}.products`;
		con.query(sql, function (err, rows) {
			if (rows) {
				resolve(rows);
			} else {
				reject({ error: "Products not found" });
			}
		});
	});
};

const store = ({ name, price, image_path = "" }, user) => {
	return new Promise(function (resolve, reject) {
		let sql = `INSERT INTO ${DATABASE}.products
                    (name, image_path, price, creator_user_id)
                    VALUES('${name}', '${image_path}', ${price}, ${user.id});`;
		con.query(sql, function (err, rows) {
			if (rows) {
				resolve("Product created correctly");
			} else {
				reject("Error creating product");
			}
		});
	});
};

const show = ({ product }) => {
	return new Promise(function (resolve, reject) {
		let sql = `SELECT * FROM ${DATABASE}.products where id='${product}'`;
		con.query(sql, function (err, rows) {
			if (rows) {
				resolve(rows[0]);
			} else {
				reject("Products not found");
			}
		});
	});
};

const update = ({ product }, { name, image_path, price }) => {
	return new Promise(function (resolve, reject) {
		let sql = `UPDATE ${DATABASE}.products
                    SET name='${name}', image_path='${image_path}', price=${price}
                    WHERE id='${product}';
        `;
		con.query(sql, function (err, rows) {
			if (rows) {
				resolve("Product updated correctly");
			} else {
				reject("Product not found");
			}
		});
	});
};

module.exports = {
	all,
	store,
	show,
	update,
};
