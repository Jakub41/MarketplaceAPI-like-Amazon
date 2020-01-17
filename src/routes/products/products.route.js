// Express
const express = require("express");
// Router
const router = express.Router();
// Product model
const product = require("../../models/product");
// Validations middleware
const check = require("../../middlewares/index.middleware");

const { pool } = require("../../db/connect");

// GET all Products
router.get("/", check.rules, async (req, res) => {
    await pool.connect().then(client => {
        return client.query('SELECT * FROM product;')
                .then(data => {
                    client.release()
                    console.log(data.rows);
                    res.json(data.rows);
                })
                .catch(e => {
                    client.release()
                    console.log("============[ERROR]=============");
                    console.log(e.stack);
                    res.status(500).json({ message: e.stack });
                });
    });
});

// GET one product
router.get("/:id", check.rules, async (req, res) => {
    const id = req.params.id;

    query = 'SELECT * FROM product WHERE _id = $1';
    values = [id];

    await pool.connect().then(client => {
        return client.query(query, values)
                .then(data => {
                    client.release();
                    console.log(data.rows);
                    res.json(data.rows[0]);
                })
                .catch(e => {
                    client.release();
                    console.log("============[ERROR]=============");
                    console.log(e.stack);
                    res.status(500).json({ message: e.stack });
                });
    });
});

// POST Add a new product
// Validate the rules before start

async function add_new_product(name, description, brand) {
    query = 'INSERT INTO product(name, description, brand) VALUES($1, $2, $3)';
    values = [name, description, brand];

    await pool.connect().then(client => {
        return client.query(query, values)
                .then(data => {
                    client.release();
                })
                .catch(e => {
                    client.release();
                    console.log("============[ERROR]=============");
                    console.log(e.stack);
                    res.status(500).json({ message: e.stack });
                });
    });
}

router.post(
    "/add",
    // check.newProduct,
    // check.rules,
    // check.productName,
    async (req, res) => {
        add_new_product(req.body.name, req.body.description, req.body.brand);

        console.log(req.body);
        res.status(200).json({
            hello: "world",
            rishitha: "minol"
        })
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
