const express = require('express')
const router = express.Router()

const Expenses = require('./../../models/expenses')

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  return Expenses.findOne({ _id })
                .then(expense => Expenses.remove(expense))
                .then(() => res.redirect('/'))
                .catch(err => res.end(err))
})

module.exports = router