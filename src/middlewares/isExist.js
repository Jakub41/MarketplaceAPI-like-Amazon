// The data file JSON
const products = require("../db/products.json");

// Product name check if exists
const checkProductNameExist = (req, res, next) => {
    // name from request
    const { name } = req.body;

    // lets check if there is no one with this product name
    if (products.find(product => product.name === name)) {
        return res.status(422).send({ message: "Product name already exists" });
    }
    next();
};

module.exports = {
    checkProductNameExist
};
