const express = require('express')
const router = express.Router()

const Expenses = require('./../../models/expenses')

 function getTotalAmount (expenses) {
  let sum = 0
  expenses.forEach(expense => sum += expense.amount)
  return sum
}

router.get('/edit/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Expenses.findOne({ _id, userId })
                  .lean()
                  .then(expense => { 
                    const expenseData = { ...expense }
                    return res.render('edit', {expense: expenseData })})
                  .catch(err => console.log(err))
})

router.get('/new', (req, res) => res.render('new'))

router.post('/new', (req, res) => {
 const expenseData = req.body
 const userId = req.user._id
 console.log(expenseData)
 
 return Expenses.create({...expenseData, 
                          id: Math.random(),
                          categoryId: Number(expenseData.category),
                          userId})
                .then(() => res.redirect('/'))
})

router.get('/', (req, res) => {
  const userId = req.user._id
  Expenses.find({ userId })
          .lean()
          .sort({ date: 1 })
          .then(expenses => {
            return res.render('home', { expenses, totalAmount: getTotalAmount(expenses) })}
            )
          })

module.exports = router
