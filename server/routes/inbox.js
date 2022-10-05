const express = require('express')

const router = express.Router()
const { getInbox } = require('../controllers/inbox')
router.post('/', getInbox)

module.exports = router
