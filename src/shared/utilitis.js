const path = require("path");
const shared = require("./sharedConsts.js");

const productDir = path.join(__dirname, shared.productJSON);

const pdfDir = shared.pdfDir;
const uploadsDir = path.join(__dirname, shared.uploads + "/" + pdfDir);

console.log("PDF Dir Utilities => ", uploadsDir);

module.exports = {
    productDir,
    uploadsDir
};
