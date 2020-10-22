"use strict";

const { body, param, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const validate = (method) => {
	switch (method) {
		case "store": {
			return [
				body("name", "name does not exists").exists(),
				body("price", "price does not exists").isInt().exists(),
				body("image_path", "Invalid email").isString(),
			];
		}
		case "show":
		case "destroy":
        case "update": {
			return [
                param("product", "product id does not exists").exists()
			];
		}
	}
};

module.exports = {
	validate,
};
