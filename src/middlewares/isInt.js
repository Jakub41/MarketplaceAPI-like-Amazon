// Validate integer
const mustBeInteger = (req, res, next) => {
    // ID from request
    const id = req.params.id;
    // If it is not a number show error
    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: "ID must be an integer" });
    } else {
        next();
    }
};

module.exports = {
    mustBeInteger
};
