const {
	requestErrors
} = require("../../utils/utilis");
const order = require("./entity");

const index = (req, res) => {
	try {
		const {
			isAdmin,
			id: user_id
		} = req.user;
		const orders = isAdmin ? order.allOrderProducts() : order.allOrderProducts(user_id);
		orders
			.then((response) => {
				if (response.length === 0) {
					res.status(204).send({
						data: "orders not found",
					});
				}
				res.status(200).send({
					data: response,
				});
			})
			.catch((error) => {
				res.status(500).send({
					error: error,
				});
			});
	} catch (error) {
		res.status(500).send({
			error: error,
		});
	}
};

const store = (req, res) => {
	requestErrors(req, res);
	try {
		const store = order.store(req.body, req.user);
		store
			.then((response) => {
				res.status(200).send({
					data: response,
				});
			})
			.catch((error) => {
				res.status(500).send({
					error: error,
				});
			});
	} catch (error) {
		res.status(500).send({
			error: error,
		});
	}
};

const update = (req, res) => {
	requestErrors(req, res);
	try {
		const update = order.update(req.params, req.body);
		update.then(response => {
			res.status(200).send(response);
		}).catch((error) => {
			res.status(500).send({
				error: error
			});
		});
	} catch (error) {
		res.status(500).send({
			error: error
		});
	}
}
const destroy = (req, res) => {
	requestErrors(req, res);
	try {
		const destroy = order.destroy(req.params, req.body);
		destroy.then(response => {
			res.status(200).send(response);
		}).catch((error) => {
			res.status(500).send({
				error: error
			});
		});
	} catch (error) {
		res.status(500).send({
			error: error
		});
	}
}


module.exports = {
	index,
	store,
	update,
	destroy
};