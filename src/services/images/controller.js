exports.save = (req, res, next) => {
    return res.status(200).json({
        path: req.file.filename
    });
};
