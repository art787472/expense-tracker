const express = require('express')
const router = express.Router()




router.get('/edit', (req, res) => res.render('edit'))

router.get('/new', (req, res) => res.render('new'))

router.get('/', (req, res) => res.render('home'))

module.exports = router
