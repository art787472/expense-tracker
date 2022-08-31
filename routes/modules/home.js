const express = require('express')
const router = express.Router()

const Expenses = require('./../../models/expenses')


router.get('/edit', (req, res) => res.render('edit'))

router.get('/new', (req, res) => res.render('new'))

router.post('/new', (req, res) => {
 const expenseData = req.body
 console.log(expenseData)
 return Expenses.create({...expenseData})
                .then(() => res.redirect('/'))
})

router.get('/', (req, res) => 
  Expenses.find()
          .lean()
          .then(expenses => res.render('home', { expenses }))
                                      )

module.exports = router
