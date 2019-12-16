const ErrorMapping = require("../shared/errors");
class ErrorParent extends Error {
    constructor() {
        super("");
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
    getError() {
        return this.error;
    }
    __400__(error = ErrorMapping.BAD_REQUEST) {
        this.error = error;
        this.status = 400;
        return this;
    }
    __401__(error = ErrorMapping.UNAUTHORIZED) {
        this.error = error;
        this.status = 401;
        return this;
    }
    __403__(error = ErrorMapping.FORBIDDEN) {
        this.error = error;
        this.status = 403;
        return this;
    }
    __404__(error = ErrorMapping.NOT_FOUND) {
        this.error = error;
        this.status = 404;
        return this;
    }
    __409__(error = ErrorMapping.CONFLICT) {
        this.error = error;
        this.status = 409;
        return this;
    }
}
module.exports = ErrorParent;
