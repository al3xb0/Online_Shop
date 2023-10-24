const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS"){
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(200).json({message: "Not logged in"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                res.status(200).json({message: "No access"})
            }
            req.user = decoded
            next()
        } catch (e) {
            res.status(200).json({message: "The user is not logged in"})
        }
    }
}



