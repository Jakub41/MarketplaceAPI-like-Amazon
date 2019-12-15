// The data file JSON
const writeFilePath = __dirname + "/../db/products.json";

// We assign the data
let products = require(writeFilePath);

// We import the helpers as we need to interact with our data
const helper = require("../helpers/helper");

// GET All Products
const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        // Check if w have any products data
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
const getOneProduct = id => {
    return new Promise((resolve, reject) => {
        // We use the helper to check the data is present in the array
        helper
            .mustBeInArray(products, id)
            .then(product => resolve(product))
            .catch(err => reject(err));
    });
};

// POST Create the Product
const createProduct = newProduct => {
    return new Promise((resolve, reject) => {
        // We create new ID with helper
        const id = { id: helper.getNewId() };
        // We create a new date time with helper
        const date = {
            created_at: helper.newDate(),
            updated_at: helper.newDate()
        };
        // We build our query
        newProduct = { ...id, ...date, ...newProduct };
        // We add t the array
        products.push(newProduct);
        // Helper write to JSON the data to file
        helper.writeJSONFile(writeFilePath, products);
        // Resolve if ok Reject with error if wrong
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
