const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked')
const expensesSchema = new Schema({
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
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})


expensesSchema.plugin(MongooseAutoIncrementID.plugin, {modelName: 'Expenses', field: 'id'})

module.exports = mongoose.model('Expenses', expensesSchema)