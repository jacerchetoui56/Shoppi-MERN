const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String,
    gender: {
        type: String,
        enum: ['men', 'women', 'baby']
    },
    price: Number,
    image: String,
    oldPrice: Number,
    reviews: Number,
    description: String,
    author: String,
    comments: [
        {
            name: String,
            comment: String
        }
    ]
})

module.exports = mongoose.model('Product', productSchema)