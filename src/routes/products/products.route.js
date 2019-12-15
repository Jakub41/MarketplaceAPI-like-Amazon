// Express
const express = require("express");
// Router
const router = express.Router();
// Product model
const product = require("../../models/product");
// Validations middleware
const {
    validateRules: rules
} = require("../../middlewares/validatorRules.middleware");
const {
    productValidationRulesPOST: newProduct
} = require("../../middlewares/validators.middleware");

const { checkProductNameExist: productName } = require("../../middlewares/isExist")

// Add a new product
// Validate the rules before start
router.post("/", newProduct, rules, productName, (req, res) => {

    // product
    product
        // Using the model to create a Product
        .createProduct(req.body)
        .then( data =>
            // OK product is created
            res.status(201).json({
                message: `The product #${data.id} has been created`,
                content: data
            })
        )
        // Error product not created
        .catch(err => res.status(500).json({ message: err.message }));
});

// Routes
module.exports = router;
