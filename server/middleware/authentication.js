
const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const { UnauthenticatedError } = require('../errors')

const auth = (req, res, next) => {
    //get the token from the headers
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('You are not authenticated')
    }

    const token = authHeader.split(' ')[1]
    try {
        const decode = jwt.verify(token, process.env.SECRET_JWT)
        if (!decode) {
            throw new UnauthenticatedError('You are not authenticated')
        }
        req.user = { userId: decode.userId, userName: decode.userName }
    } catch (error) {
        throw new UnauthenticatedError('You are not authenticated')
    }
    next()
}

module.exports = auth