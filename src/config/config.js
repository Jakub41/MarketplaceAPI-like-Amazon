require("dotenv").config();

module.exports = {
    port: process.env.PORT,
    products: process.env.PRODUCTS,
    db_Products: process.env.JSON_PRODUCTS,
    uploads: process.env.UPLOADS,
    pdfDir: process.env.PDF
};

