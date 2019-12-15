// The data file JSON
const writeFilePath = __dirname + "/../db/products.json";

// We assign the data
let products = require(writeFilePath);

// We import the helpers as we need to interact with our data
const helper = require("../helpers/helper");

// GET All Products
const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        if (products.length === 0) {
            reject({
                message: "no products available",
                status: 202
            });
        }
        resolve(products).catch(err => reject(err));
    });
};

// GET One Product
const getOneProduct = id => {};

// POST Create the Product
const createProduct = newProduct => {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId() };
        const date = {
            created_at: helper.newDate(),
            updated_at: helper.newDate()
        };
        newProduct = { ...id, ...date, ...newProduct };
        products.push(newProduct);
        helper.writeJSONFile(writeFilePath, products);
        resolve(newProduct).catch(err => reject(err));
    });
};

// PUT Update the Product
const updateProduct = (id, newProduct) => {};

// Delete Product
const deleteProduct = id => {};

// Exporting the modules
module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
