const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        try {
            const tokenData = jwt.verify(token, process.env.JWT_SECRET)
            req.tokenData = tokenData
            next()
        } catch (e) {
            res.json({ error: e })
        }
    } else {
        res.json({
            notice: 'token is required to access this route'
        })
    }
}

module.exports = {
    authenticateUser
}