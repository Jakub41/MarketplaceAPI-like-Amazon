// Express
const express = require("express");
// Router
const router = express.Router();
// Product model
const product = require("../../models/product");
// Validations middleware
const check = require("../../middlewares/index.middleware");

// GET all Products
router.get("/", check.rules, async (req, res) => {
    // Await response server
    await product
        .getAllProducts()
        // Result the all Products
        .then(products => res.json(products))
        // If any errors
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            } else {
                res.status(500).json({ message: err.message });
            }
        });
});

// GET one product
router.get("/:id", check.isValidId, check.rules, async (req, res) => {
    const id = req.params.id;
    await product
        .getOneProduct(id)
        .then(product => res.json(product))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            } else {
                res.status(500).json({ message: err.message });
            }
        });
});

// POST Add a new product
// Validate the rules before start
router.post(
    "/",
    check.newProduct,
    check.rules,
    check.productName,
    (req, res) => {
        // product
        product
            // Using the model to create a Product
            .createProduct(req.body)
            .then(data =>
                // OK product is created
                res.status(201).json({
                    message: `The product #${data.id} has been created`,
                    content: data
                })
            )
            // Error product not created
            .catch(err => res.status(500).json({ message: err.message }));
    }
);

// PUT Update the product
router.put("/:id", check.isValidId, check.updateProduct, check.rules, async (req, res) => {
    const id = req.params.id;
    await product
        .updateProduct(id, req.body)
        .then(product =>
            res.json({
                message: `The product #${id} has been updated`,
                content: product
            })
        )
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            }
            res.status(500).json({ message: err.message });
        });
});

// Routes
module.exports = router;
