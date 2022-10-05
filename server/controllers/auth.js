const User = require('../models/User.model')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')


const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    if (!name || !email || !password || !confirmPassword) {
        throw new BadRequestError('Please Fill The Form Properly')
    }
    if (password !== confirmPassword) {
        throw new BadRequestError("Passwords Are Not Matching")
    }
    try {
        const user = await User.create({ name, email, password })
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({ success: true, userName: user.name, count: user.cart.length, token })
    } catch (error) {
        throw new BadRequestError('User Already Exists')
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide an email and password')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid email or password')
    }
    const isPassMatch = await user.comparePassword(password)

    if (!isPassMatch) {
        throw new UnauthenticatedError('invalid email or password')
    }
    const token = user.createJWT()

    res.status(StatusCodes.OK).json({ success: true, userName: user.name, count: user.cart.length, token })
}



module.exports = {
    login, register
}