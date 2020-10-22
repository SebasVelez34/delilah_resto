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
				reject({ message: "Product not found" });
			}
		});
	});
};

const update = ({ product }, { name, image_path, price }) => {
	return new Promise(function (resolve, reject) {
		if (!name && !image_path && !price) {
			reject({ message: "All fields are empty to update the product" });
		}
		let sqlSelect = `SELECT * FROM ${DATABASE}.products where id='${product}'`;
		con.query(sqlSelect, function (err, rows) {
			if (rows) {
				name = !name ? rows[0].name : name;
				image_path = !image_path ? rows[0].image_path : image_path;
				price = !price ? rows[0].price : price;

				let sql = `UPDATE ${DATABASE}.products SET name='${name}',image_path='${image_path}',price='${price}' WHERE id='${product}';`;
				con.query(sql, function (err, rows) {
					if (rows) {
						resolve({ message: "Product updated correctly" });
					} else {
						reject({ message: "Erro updating product" });
					}
				});
			} else {
				reject({ message: "Product not found" });
			}
		});
	});
};

const destroy = ({ product }) => {
	return new Promise(function (resolve, reject) {
		let sql = `DELETE FROM ${DATABASE}.products where id='${product}'`;
		con.query(sql, function (err, rows) {
			if (rows) {
				resolve({ message: "Product deleted correctly" });
			} else {
				reject({ message: "Product not found" });
			}
		});
	});
};

module.exports = {
	all,
	store,
	show,
	update,
	destroy,
};
