const pg = require('pg');

var config = {
    user: 'postgres',
    password: 'password',
    database: 'sample_database'
}

const pool = new pg.Pool(config);

module.exports = {
    pool
};
