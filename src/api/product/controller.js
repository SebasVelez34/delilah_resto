
const { requestErrors } = require('../../utils/utilis');
const product = require('./entity');

const index = (req, res) => {
    try {
        const products = product.all();
        products.then(response =>{
            if (response.length === 0) {
                res.status(204).send({
                    data: "Products not found"
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
};

const store = (req, res) => {
    requestErrors(req, res);
    try {
        const store = product.store(req.body, req.user);
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

const show = (req,res) => {
    requestErrors(req, res);
    try {
        const show = product.show(req.params);
        show.then(response =>{
            if (response.length === 0) {
                res.status(204).send({
                    data: "Product not found"
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
        const update = product.update(req.params, req.body);
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



module.exports = {
    index,
    store,
    show,
    update
}
