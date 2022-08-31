const express = require('express')
const router = express.Router()

const Expenses = require('./../../models/expenses')

 function getTotalAmount (expenses) {
  let sum = 0
  expenses.forEach(expense => sum += expense.amount)
  return sum
}

router.get('/edit', (req, res) => res.render('edit'))

router.get('/new', (req, res) => res.render('new'))

router.post('/new', (req, res) => {
 const expenseData = req.body
 console.log(expenseData)
 
 return Expenses.create({...expenseData, id: Math.random(), categoryId: Number(expenseData.category)})
                .then(() => res.redirect('/'))
})

router.get('/', (req, res) => 
  Expenses.find()
          .lean()
          .then(expenses => {
            console.log(expenses)
            console.log(getTotalAmount(expenses))
            return res.render('home', { expenses, totalAmount: getTotalAmount(expenses) })}
            )
          )

module.exports = router
