"use strict";
const { body, param } = require("express-validator");
const con = require("../../db/connection");
const { productsIn } = require("../product/entity");

const validate = (method) => {
	switch (method) {
		case "store": {
			return [
				body("products", "Products does not exists").isArray().exists(),
				body("payment_method", "Payment method does not exists").isIn([
					"cash",
					"credit card",
					"other",
				]),
			];
		}
		case "show":
		case "destroy": {
			return [param("order", "order id does not exists").exists()];
		}
		case "update": {
			return [
				param("order", "order id does not exists").exists(),
				body("status_id", "status_id does not exists").exists(),
			];
		}
	}
};

const getTotalOrder = async (products) => {
	const productsQuery = await getProductsIn(products);
	let total = 0;
	for (const product of productsQuery) {
		total +=
			product.price *
			products.find((x) => x.product_id === product.id).quantity;
	}
	return total;
};

const getDescription = async (products) => {
	const productsQuery = await getProductsIn(products);
	let description = "";
	for (const product of productsQuery) {
		const { quantity } = products.find((x) => x.product_id === product.id);
		description += `${quantity}x ${product.name} `;
	}
	return description.trim();
};

const getProductsIn = async (products) => {
	const ids = products.map((product) => product.product_id);
	const productsQuery = await productsIn(ids).then((products) => products);
	return productsQuery;
};

module.exports = {
	validate,
	getTotalOrder,
	getDescription,
};
