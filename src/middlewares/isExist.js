const product = require("../models/product");

// Product name check if exists
const checkProductNameExist = async (req, res, next) => {
    product_data = await product.get_single_product_by_name(req.body.name);

    // lets check if there is no one with this product name
    if ((product_data != null) && (req.body.name == product_data.name)) {
        return res.status(422).send({ message: "Product name already exists" });
    }
    next();
};

module.exports = {
    checkProductNameExist
};
