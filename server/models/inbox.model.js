const mongoose = require('mongoose')


const inboxSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    message: {
        type: String,
        required: [true, 'Please provide a message']
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
    subject: {
        type: String,
        default: 'No Subject'
    }

})


module.exports = mongoose.model('Inbox', inboxSchema)