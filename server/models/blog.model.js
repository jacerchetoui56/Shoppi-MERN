const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    date: {
        day: String,
        month: String
    },
    image: String,
    description: String,
    type: String,
    comments: Number
})


module.exports = mongoose.model('Blog', blogSchema)