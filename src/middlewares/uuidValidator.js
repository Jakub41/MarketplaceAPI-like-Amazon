const validate = require("uuid-validate");

const uuidValidator = (req, res, next) => {
    // ID from request
    const id = req.params.id;

    if (!validate(id)) {
        res.status(400).json({ message: "ID is not valid" });
    } else {
        next();
    }
};

module.exports = {
    uuidValidator,
}
