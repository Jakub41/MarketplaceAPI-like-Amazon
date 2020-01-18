// We import the helpers as we need to interact with our data
const helper = require("../helpers/helper");
const { pool } = require("../db/connect");

const getAllProducts = async () => {
    all_products = null;

    await pool.connect().then(client => {
        return client.query('SELECT * FROM product;')
                .then(data => {
                    client.release()
                    // console.log(data.rows);
                    all_products = data.rows;
                })
                .catch(e => {
                    client.release()
                    console.log("============[ERROR]=============");
                    all_products = e;
                });
    });

    return all_products;
}

// GET One Product
const getOneProduct = async (id) => {
    product = null;

    sql_ = "SELECT * FROM product WHERE _id = $1";
    sql_values = [id];

    await pool.connect().then(client => {
        return client.query(sql_, sql_values)
                .then(data => {
                    client.release()
                    // console.log(data.rows);
                    product = data.rows[0];
                })
                .catch(e => {
                    client.release()
                    console.log("============[ERROR]=============");
                    product = e;
                });
    });

    return product;
};

const add_new_product = async (name, description, brand, image_url, price, category) => {
    query = 'INSERT INTO product(name, description, brand, image_url, price, category, created_at, updated_at) ' +
            'VALUES($1, $2, $3, $4, $5, $6, $7, $8);';
    values = [name, description, brand, image_url, price, category, helper.newDate(), helper.newDate()];

    error = 1;

    await pool.connect().then(client => {
        return client.query(query, values)
                .then(data => {
                    client.release();
                })
                .catch(e => {
                    client.release();
                    console.log("============[ERROR]=============");
                    console.log(e.stack);
                    error = 0;
                });
    });

    return error;
}

// Get one product by it's name
const get_single_product_by_name = async (name) => {
    product = null;

    sql_ = "SELECT * FROM product WHERE name = $1";
    sql_values = [name];

    await pool.connect().then(client => {
        return client.query(sql_, sql_values)
                .then(data => {
                    client.release()
                    // console.log(data.rows);
                    product = data.rows[0];
                })
                .catch(e => {
                    client.release()
                    console.log("============[ERROR]=============");
                    console.log(e);
                });
    });

    return product;
};

// PUT Update the Product
const updateProduct = async (_id, req_body) => {
    query = 'UPDATE product ' +
            'SET ' +
            '   name = $2,' +
            '   description = $3,' +
            '   brand = $4,' +
            '   image_url = $5,' +
            '   price = $6,' +
            '   category = $7,' +
            '   updated_at = $8 ' +
            'WHERE ' +
            '   product._id = $1;';
    values = [_id, req_body.name, req_body.description, req_body.brand, req_body.imageUrl, req_body.price, req_body.category, helper.newDate()];

    error = 1;
    await pool.connect().then(client => {
        return client.query(query, values)
                .then(data => {
                    client.release();
                })
                .catch(e => {
                    client.release();
                    console.log("============[ERROR]========1=====");
                    console.log(e.stack);
                    error = 0;
                });
    });

    return error;
}

const deleteProduct = async (_id) => {
    query = 'DELETE FROM product ' +
            'WHERE product._id = $1;';
    values = [_id];

    error = 1;
    await pool.connect().then(client => {
        return client.query(query, values)
                .then(data => {
                    client.release();
                })
                .catch(e => {
                    client.release();
                    console.log("============[ERROR]=============");
                    console.log(e.stack);
                    error = 0;
                });
    });

    return error;
}

// Exporting the modules
module.exports = {
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    add_new_product,
    get_single_product_by_name
};
