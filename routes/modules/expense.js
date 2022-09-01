const express = require('express')
const router = express.Router()

const Expenses = require('./../../models/expenses')



router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Expenses.findOne({ _id, userId })
                .then(expense => Expenses.remove(expense))
                .then(() => res.redirect('/'))
                .catch(err => res.end(err))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { id, name, date, categoryId, amount } = req.body
  return Expenses.findOne({ _id, userId })
                .then(expense => {
                  expense.id = id
                  expense.name = name
                  expense.date = date
                  expense.categoryId = categoryId
                  expense.amount = amount
                  expense.userId = userId
                  return expense.save()
                })
                .then(() => res.redirect('/'))
                .catch(err => console.error(err))
})

module.exports = router