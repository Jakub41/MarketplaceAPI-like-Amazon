// Express
const express = require("express");
// Router
const router = express.Router();
// Product model
const product = require("../../models/product");
// Validations middleware
const check = require("../../middlewares/index.middleware");

const { pool } = require("../../db/connect");

const helper = require("../../helpers/helper");

// GET all Products
router.get("/", check.rules, async (req, res) => {
    respon = helper.common_response();
    all_products = await product.getAllProducts();

    respon.data = all_products;

    res.status(respon.status).json(respon);
});

// GET one product
router.get("/:id", check.rules, async (req, res) => {
    respon = helper.common_response();
    one_product = await product.getOneProduct(req.params.id);

    if (one_product._id) {
        respon.status = 200;
        respon.data = one_product;
    } else {
        respon.status = 500;
        respon.message = "Internal error occured";
    }

    res.status(respon.status).json(respon);
});

// POST Add a new product
// Validate the rules before start
router.post("/add", check.rules, check.newProduct, check.productName, async (req, res) => {
    respon = helper.common_response();

    is_okay = await product.add_new_product(req.body.name, req.body.description, req.body.brand,
                                            req.body.imageUrl, req.body.price, req.body.category);
    if (is_okay) {
        respon.status = 201;
        respon.message = "successfully added.";
    } else {
        respon.status = 500;
        respon.message = "Error in adding";
    }

    res.status(respon.status).json(respon);
});

// PUT Update the product
// Validate id, fields and rules before update
router.put("/:id", check.rules, /* check.isValidId,*/ check.updateProduct, check.productName, async (req, res) => {
    respon = helper.common_response();
    const id = req.params.id;

    is_okay = await product.updateProduct(id, req.body);
    if (is_okay) {
        respon.status = 201;
        respon.message = `The product #${id} has been updated`;
    } else {
        respon.status = 500;
        respon.message = "Error in updating the product";
    }

    res.status(respon.status).json(respon);
});

// DELETE a product
// Validate the ID before delete
router.delete("/:id", /* check.isValidId, */ async (req, res) => {
    respon = helper.common_response();
    const id = req.params.id;

    is_okay = await product.deleteProduct(id);
    if (is_okay) {
        respon.status = 201;
        respon.message = `The product #${id} has been deleted`;
    } else {
        respon.status = 500;
        respon.message = "Error in deleting the product";
    }

    res.status(respon.status).json(respon);
});

// Routes
module.exports = router;
