const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked')
const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

userSchema.plugin(MongooseAutoIncrementID.plugin, {modelName: 'User', field: 'id'})

module.exports = mongoose.model('User', userSchema)
