
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            , "Please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        // maxlength: 12
    },
    cart:
        [
            {
                name: String,
                image: String,
                price: Number,
                id: String,
                amount: {
                    type: Number,
                    default: 1
                }
            }
        ]
})


userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createJWT = function () {
    //you can use this website to generate a secret key => http://allkeysgenerator.com
    return jwt.sign({ userId: this._id, userName: this.name }, process.env.SECRET_JWT, { expiresIn: process.env.LIFETIME_JWT })
}

userSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch
}

module.exports = mongoose.model('User', userSchema)