const config = require("../config/config")
const multer = require("multer");
const FileError = require("../errors/file-error");
const ErrorParent = require("../errors/parent-error");
const catchError = require("../helpers/errors");
const ErrorMapping = require("../shared/errors");
const MIME_TYPE_MAP = require("../middlewares/mime").MIME_TYPE_IMAGE;

const storage = multer.diskStorage({
    //Specify destination and validations
    destination: (req, file, cb) => {
        let error = new FileError().__400__(ErrorMapping.INVALID_FILE);
        if (file) {
            //Validating our mime types
            const isValid = MIME_TYPE_MAP[file.mimetype];
            if (isValid) {
                error = null;
            }
        }
        //Your choice if it's required or not(if required remove the else or set the required errors)
        else {
            error = null;
        }
        //Return error object and path where t store
        cb(error, config.publicUploads);
    },
    //Store the file
    filename: (req, file, cb) => {
        let name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        if (name.split(".").length > 1) {
            let tempName = name.split(".");
            tempName.pop();
            name = tempName.join(".");
        }
        name += "-" + Date.now();
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "." + ext);
    }
});

module.exports = (req, res, next) => {
    multer({ storage: storage }).single("file")(req, res, function(err) {
        //Catching and handling errors of multer
        if (err instanceof multer.MulterError) {
            return catchError(
                res,
                new FileError().__400__(ErrorMapping.INVALID_FILE_HEADER_NAME)
            );
        } else if (err) {
            console.log(err);
            if (err instanceof ErrorParent) {
                return catchError(res, err);
            }
            return catchError(
                res,
                new FileError().__400__(ErrorMapping.INVALID_FILE_DATA)
            );
        }
        //Everything is ok
        next();
    });
};
