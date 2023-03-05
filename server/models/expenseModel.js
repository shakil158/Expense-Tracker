const mongoose = require('mongoose')

const Schema = mongoose.Schema

const expenseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  user_id: {
    type: String,
    required: true
  }

}, { timestamps: true })


const expenseModel = mongoose.model('Expense',expenseSchema)

module.exports = {expenseModel}