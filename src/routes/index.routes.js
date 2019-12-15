// Config
const api = require("../config/config")
// Express Lib
const express = require("express");
// Routes lib
const router = express.Router();

// Defining the Index Router for Products
router.use(api.products, require("./products/products.route"));

// Exporting the Index Router
module.exports = router;
