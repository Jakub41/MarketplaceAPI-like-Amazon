// Express
const express = require("express");
// Router
const router = express.Router();
// Product model
const product = require("../../models/product");
// Validations middleware
const check = require("../../middlewares/index.middleware");
// Image Controller
const ImageController = require("../../services/images/controller");
// Image upload middleware
const fileUpload = require("../../middlewares/image");

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

// POST Upload Product picture
router.post(
    "/:id/upload",
    fileUpload,
    ImageController.save,
    async (req, res) => {
        //we need to check if we have an existing product with the given id
        const products = await product.getAllProducts()
        const product = products.find(prod => prod._id === req.params.id);
        if (product) {
            const fileDest = path.join(
                __dirname,
                "../../images/",
                req.params.id + path.extname(req.file.originalname)
            );
            await fs.writeFile(fileDest, req.file.buffer);
            product.updateAt = new Date();
            product.imageUrl =
                "/images/" +
                req.params.id +
                path.extname(req.file.originalname);
            await writeProducts(filePath, products);
            res.send(product);
        } else res.status(404).send("Not found");
    }
);

// PUT Update the product
// Validate id, fields and rules before update
router.put(
    "/:id",
    check.isValidId,
    check.updateProduct,
    check.rules,
    async (req, res) => {
        // Request ID
        const id = req.params.id;
        // Await th product
        await product
            // Call model to update the product
            .updateProduct(id, req.body)
            // Response a message
            .then(product =>
                res.json({
                    message: `The product #${id} has been updated`,
                    content: product
                })
            )
            // Errors if any
            .catch(err => {
                if (err.status) {
                    res.status(err.status).json({ message: err.message });
                }
                res.status(500).json({ message: err.message });
            });
    }
);

// DELETE a product
// Validate the ID before delete
router.delete("/:id", check.isValidId, async (req, res) => {
    const id = req.params.id;
    // Await server
    await product
        // Model delete product
        .deleteProduct(id)
        .then(product =>
            // Response
            res.json({
                message: `The product #${id} has been deleted`
            })
        )
        // Any error
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            }
            res.status(500).json({ message: err.message });
        });
});

// Routes
module.exports = router;
