require("dotenv").config();

module.exports = {
    // Server
    port: process.env.PORT,
    products: process.env.PRODUCTS,
    // Directories
    db_Products: process.env.JSON_PRODUCTS,
    uploads: process.env.UPLOADS,
    pdfDir: process.env.PDF,
    // Email
    email_port: process.env.EMAIL_PORT,
    email_host: process.env.EMAIL_HOST,
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS
};

