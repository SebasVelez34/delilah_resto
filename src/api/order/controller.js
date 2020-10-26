
const { requestErrors } = require('../../utils/utilis');
const order = require('./entity');

/* const index = (req, res) => {
    try {
        const orders = order.all();
        orders.then(response =>{
            if (response.length === 0) {
                res.status(204).send({
                    data: "orders not found"
                });
            }
            res.status(200).send({
                data: response
            });
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
}; */

const store = (req, res) => {
    requestErrors(req, res);
    try {
        const store = order.store(req.body, req.user);
        store.then(response =>{
            res.status(200).send({
                data: response
            });
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

/* const show = (req,res) => {
    requestErrors(req, res);
    try {
        const show = order.show(req.params);
        show.then(response =>{
            if (response.length === 0) {
                res.status(204).send({
                    data: "order not found"
                });
            }
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

const update = (req,res) => {
    requestErrors(req, res);
    try {
        const update = order.update(req.params, req.body);
        update.then(response =>{
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

const destroy = (req,res) => {
    requestErrors(req, res);
    try {
        const destroy = order.destroy(req.params);
        destroy.then(response =>{
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
} */



module.exports = {
/*     index, */
    store,
/*     show,
    update,
    destroy */
}
