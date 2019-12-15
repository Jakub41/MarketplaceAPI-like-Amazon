// Express
const express = require("express");
// Router
const router = express.Router();
// Product model
const product = require("../../models/product");
// Validations middleware
const {
    validateRules
} = require("../../middlewares/validatorRules.middleware");
const {
    productValidationRulesPOST
} = require("../../middlewares/validators.middleware");

const { checkProductNameExist: pName } = require("../../middlewares/isExist")

// Add a new product
// Validate the rules before start
router.post("/", productValidationRulesPOST, validateRules, pName, (req, res) => {

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
