const express = require('express')
const router = express.Router()


router.get('/', (req, res) => res.end('expense-tracker'))

module.exports = router
