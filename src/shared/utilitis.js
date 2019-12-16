const path = require('path');
const shared = require("./sharedConsts.js")

const productDir = path.join(__dirname, shared.productJSON);

module.exports = {
    productDir
}
