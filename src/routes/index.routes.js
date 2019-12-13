// Express Lib
const express = require("express");
// Routes lib
const router = express.Router();

// Exporting the Index Router
module.exports = router;

// Defining the Index Router for Products
router.use("/api/v1/products", require("./products/products.route"));
