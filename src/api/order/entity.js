const con = require("../../db/connection");
const { getTotalOrder, getDescription } = require("./functions");
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

const store = async ({ products, payment_method }, user) => {
	const total = await getTotalOrder(products);
	const description = await getDescription(products);
	const dateNow = new Date().toISOString().slice(0, 10);
	const timeNow = new Date().toISOString().slice(11, 16);
	return new Promise(function (resolve, reject) {
		let sql = `INSERT INTO ${DATABASE}.orders (user_id, payment_method, total, status_id, \`date\`, \`time\`, description, created_at) VALUES(${user.id}, '${payment_method}', ${total}, 1, '${dateNow}', '${timeNow}', '${description}', '${dateNow} ${timeNow}');`;
		con.query(sql, function (err, rows) {
			if (rows) {
				const { insertId: orderId } = rows;
				storeOrderProduct({ products, orderId, dateNow, timeNow },()=>{
                    resolve("Order created correctly");
                });
			} else {
				console.log(err);
				reject("Error creating product");
			}
		});
	});
};

const storeOrderProduct = ({ products, orderId, dateNow, timeNow },callback) => {
	products.forEach((product) => {
		let sql = `INSERT INTO ${DATABASE}.orders_products (order_id, product_id, quantity, status_id,created_at) 
                    VALUES(${orderId}, '${product.product_id}', ${product.quantity}, 1, '${dateNow} ${timeNow}');`;
		con.query(sql, function (err, rows) {
			if (err) console.log(err);
		});
    });
    callback();
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
