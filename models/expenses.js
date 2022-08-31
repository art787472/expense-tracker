const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked')
const expensesSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  categoryId: {
    type: Number,
    ref: 'Categories',
    index: 'true',
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})



module.exports = mongoose.model('Expenses', expensesSchema)