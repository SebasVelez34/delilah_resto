const con = require("../../db/connection");
const {
	getTotalOrder,
	getDescription
} = require("./functions");
require("dotenv").config();
const DATABASE = process.env.DB_NAME;

const allOrderProducts = (user_id) => {
	return new Promise(function (resolve, reject) {
		let sql = `SELECT o.*,op.* FROM ${DATABASE}.orders o
					INNER JOIN ${DATABASE}.orders_products op
					ON op.order_id  = o.id
					WHERE isActive=true`;
		if (user_id) sql += ` WHERE user_id=${user_id};`;
		con.query(sql, function (err, rows) {
			if (rows) {
				resolve(rows);
			} else {
				reject({
					error: "Orders not found"
				});
			}
		});
	});
};

const store = async ({
	products,
	payment_method
}, user) => {
	const total = await getTotalOrder(products);
	const description = await getDescription(products);
	const dateNow = new Date().toISOString().slice(0, 10);
	const timeNow = new Date().toISOString().slice(11, 16);
	return new Promise(function (resolve, reject) {
		let sql = `INSERT INTO ${DATABASE}.orders (user_id, payment_method, total, status_id, \`date\`, \`time\`, description, created_at) 
				   VALUES(${user.id}, '${payment_method}', ${total}, 1, '${dateNow}', '${timeNow}', '${description}', '${dateNow} ${timeNow}');`;
		con.query(sql, function (err, rows) {
			if (rows) {
				const {
					insertId: orderId
				} = rows;
				storeOrderProduct({
					products,
					orderId,
					dateNow,
					timeNow
				}, () => {
					resolve("Order created correctly");
				});
			} else {
				console.log(err);
				reject("Error creating order");
			}
		});
	});
};

const storeOrderProduct = ({
		products,
		orderId,
		dateNow,
		timeNow
	},
	callback
) => {
	products.forEach((product) => {
		let sql = `INSERT INTO ${DATABASE}.orders_products (order_id, product_id, quantity, status_id,created_at) 
                    VALUES(${orderId}, '${product.product_id}', ${product.quantity}, 1, '${dateNow} ${timeNow}');`;
		con.query(sql, function (err, rows) {
			if (err) console.log(err);
		});
	});
	callback();
};

const update = ({
	order
}, {
	status_id
}) => {
	return new Promise(function (resolve, reject) {
		let sql = `UPDATE ${DATABASE}.orders SET status_id=${status_id} WHERE id='${order}';`;
		con.query(sql, function (err, rows) {
			console.log(err);
			if (rows) {
				resolve({
					message: "Order updated correctly"
				});
			} else {
				reject({
					message: "Error updating order"
				});
			}
		});
	});
};

const destroy = ({
	order
}) => {
	return new Promise(function (resolve, reject) {
		let sql = `UPDATE ${DATABASE}.orders SET isActive=0 WHERE id='${order}';`;
		con.query(sql, function (err, rows) {
			console.log(err);
			if (rows) {
				resolve({
					message: "Order delete correctly"
				});
			} else {
				reject({
					message: "Error deleting order"
				});
			}
		});
	});
};

module.exports = {
	allOrderProducts,
	store,
	update,
	destroy
};