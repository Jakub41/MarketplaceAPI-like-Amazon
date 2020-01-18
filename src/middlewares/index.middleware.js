// Index middleware
const { checkProductNameExist } = require("./isExist");
const { validateRules } = require("./validatorRules.middleware");
const { productValidationRulesPOST, productUpdateRules } = require("./validators.middleware");
const { mustBeInteger } = require("./isInt")
const { uuidValidator } = require("./uuidValidator")

module.exports = {
    productName: checkProductNameExist,
    rules: validateRules,
    newProduct: productValidationRulesPOST,
    updateProduct: productUpdateRules,
    isInt: mustBeInteger,
    isValidId: uuidValidator
};
