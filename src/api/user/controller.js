const statusController = async (req, res) => {
    try {
        const hola = {
            "message": "Heeeeello"
        }
        res.status(200).send(hola);
    } catch (err) {
        res.status(500).send({
            status: err.message
        });
    }
};

const signin = async (req, res) => {
    console.log(req.body);
    try {
        const {
            fullname,
            nick,
            email,
            address,
            phone,
            password
        } = req.body;
        res.status(200).send({
            data: fullname || "r"
        });
    } catch (error) {
        res.status(500).send({
            status: error.message
        });
    }
};

module.exports = {
    statusController,
    signin
};