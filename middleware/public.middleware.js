


function filePath(path) {
    return  function cors(req, res, next) {
        req.pathPublic = path
        next();
    }
}

module.exports = filePath
