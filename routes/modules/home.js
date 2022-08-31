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
  console.log('_id', _id)
  return Expenses.findOne({ _id })
                  .lean()
                  .then(expense => { 
                    const expenseData = { ...expense }
                    return res.render('edit', {expense: expenseData })})
                  .catch(err => console.log(err))
})

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
