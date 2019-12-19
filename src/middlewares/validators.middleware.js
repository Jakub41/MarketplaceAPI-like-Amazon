// Adding body module of express validator
const { body, oneOf } = require("express-validator");

// Product fields validations
const productValidationRulesPOST = [
    // Name must be min 3 characters and required
    body("name", "Name is required and 3 characters at least")
        .exists()
        .notEmpty()
        .isLength({ min: 3 }),
    // Description must be min 10 characters and required
    body("description", "Description is required and 10 characters at least")
        .exists()
        .notEmpty()
        .isLength({ min: 10 }),
    // Brand required and min length 3
    body("brand", "3 characters at least")
        .exists()
        .notEmpty()
        .isLength({ min: 3 }),
    // Image URL not required
    body("imageUrl")
        .optional()
        .notEmpty(),
    // Price as a number and required
    body("price", "Price is required")
        .exists()
        .notEmpty()
        .isNumeric(),
    // Category not required min length 3
    body("category", "3 characters at least")
        .optional()
        .notEmpty()
        .isLength({ min: 3 })
];

const productUpdateRules = [
    oneOf(
        // <-- one of the following must exist
        [
            // Name must be min 3 characters and required
            body("name", "Name is required and 3 characters at least")
                .exists()
                .notEmpty()
                .isLength({ min: 3 }),
            // Description must be min 10 characters and required
            body(
                "description",
                "Description is required and 10 characters at least"
            )
                .exists()
                .notEmpty()
                .isLength({ min: 10 }),
            // Brand required and min length 3
            body("brand", "3 characters at least")
                .exists()
                .notEmpty()
                .isLength({ min: 3 }),
            // Image URL not required
            body("imageUrl")
                .notEmpty()
                .optional(),
            // Price as a number and required
            body("price", "Price is required")
                .exists()
                .notEmpty()
                .isNumeric(),
            // Category not required min length 3
            body("category", "3 characters at least")
                .optional()
                .notEmpty()
                .isLength({ min: 3 })
        ]
    )
];

// Exports the required methods
module.exports = {
    productValidationRulesPOST,
    productUpdateRules
};
