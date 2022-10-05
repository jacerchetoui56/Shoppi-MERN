const { StatusCodes } = require('http-status-codes')
const Blog = require('../models/blog.model')

const getBlogs = async (req, res) => {
    const blogs = await Blog.find({})
    if (!blogs) {
        throw new Error()
    }
    res.status(StatusCodes.OK).json({ success: true, data: blogs })
}


module.exports = {
    getBlogs
}