const ErrorParent = require("../errors/parent-error");
const ErrorMapping = require("../shared/errors");

const catchError = (res, err) => {
    if (err instanceof ErrorParent) {
        return res.status(err.status).json({
            message: err
        });
    } else {
        return res.status(500).json({
            message: ErrorMapping.INTERNAL_ERROR
        });
    }
};

module.exports = catchError;
