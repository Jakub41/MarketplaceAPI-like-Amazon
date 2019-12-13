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
const { productValidationRulesPOST } = require("../../middlewares/validators.middleware");

// Add a new product
// Validate the rules before start
router.post("/", productValidationRulesPOST(), validateRules, async (req, res) => {
    // Waiting for product
    await product
        // Using the model to create a Product
        .createProduct(req.body)
        .then(product =>
            // OK product is created
            res.status(201).json({
                message: `The product #${product.id} has been created`,
                content: product
            })
        )
        // Error product not created
        .catch(err => res.status(500).json({ message: err.message }));
});

// Routes
module.exports = router;
