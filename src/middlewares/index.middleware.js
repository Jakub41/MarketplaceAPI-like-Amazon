// Index middleware
const { checkProductNameExist } = require("./isExist");
const { validateRules } = require("./validatorRules.middleware");
const { productValidationRulesPOST } = require("./validators.middleware");
const { mustBeInteger } = require("./isInt")

module.exports = {
    productName: checkProductNameExist,
    rules: validateRules,
    newProduct: productValidationRulesPOST,
    isInt: mustBeInteger
};
