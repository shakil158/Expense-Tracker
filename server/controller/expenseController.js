const mongoose = require('mongoose')

const {expenseModel:Expense, expenseSummaryModel: ExpenseSummary} = require('../models/expenseModel');

//get all expenses GET /api/expenses
const getAllExpenses = async(req,res) => {
    const user_id = req.user._id
    const expenses = await Expense.find({user_id}).sort({createdAt: -1})
    res.status(200).json(expenses)
}

//calculate expenses summary
const getExpenseSummary = async(req, res) => {
    const user_id = req.user._id

    // calculate expenditure
    const expenditure_summary = await Expense.aggregate([
        { $match: {
            user_id: user_id.toString(),
            type: 'Expenditure'
        }},
        {$group: {_id:'Total Expenditure', amount: { $sum: '$amount' }}}      
    ])
    
    // calculate savings
    const savings_summary = await Expense.aggregate([
        { $match: {
            user_id: user_id.toString(),
            type: 'Savings'
        }},
        {$group: {_id:'Total Expenditure', amount: { $sum: '$amount' }}}    
    ])
        
    res.status(200).json({'total_expenditure': expenditure_summary.length ? expenditure_summary[0].amount : 0, 
    'total_savings': savings_summary.length ? savings_summary[0].amount: 0})
} 

//get expenses summary
const getExpensesSummary = async(req,res) => {
    const user_id = req.user._id
    const expensesSummary = await ExpenseSummary.find({user_id});
    res.status(200).json(expensesSummary);
}

//get a single expenses GET /api/expenses/:id
const getExpenseById = async(req,res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such expense'})
    }

    const expense = await Expense.findById(id)
    if (!expense) {
        return res.status(404).json({error: 'No such expense'})
    }

    res.status(200).json(expense)
}


//create a new expense POST /api/expenses
const createExpense = async(req,res) => {
    const {name, type, category, amount, date, description} = req.body

    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!type) {
        emptyFields.push('type')
    }
    if (!category) {
        emptyFields.push('category')
    }
    if (!amount) {
        emptyFields.push('amount')
    }
    if (!date) {
        emptyFields.push('date')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // add to the database
    try {
        const user_id = req.user._id
        const expense = await Expense.create({ name, type, category, amount, date, description, user_id})
        res.status(200).json(expense)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a single expense DELETE /api/expenses/:id
const deleteExpenseById = async(req,res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such expense'})
    }

    const expense = await Expense.findOneAndDelete({_id: id})
    if(!expense) {
        return res.status(400).json({error: 'No such expense'})
    }

    res.status(200).json(expense)
}

//update a single expense PATCH /api/expenses/:id
const updateExpenseById = async(req,res) => {

    console.log('update api called', req.params, req.body)
    const {name, type, category, amount, date} = req.body
    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!type) {
        emptyFields.push('type')
    }
    if (!category) {
        emptyFields.push('category')
    }
    if (!amount) {
        emptyFields.push('amount')
    }
    if (!date) {
        emptyFields.push('date')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such expense'})
    }

    const expense = await Expense.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!expense) {
        return res.status(400).json({error: 'No such expense'})
    }
    
    console.log('expense',expense)
    res.status(200).json(expense)
}



module.exports = {getAllExpenses,
getExpenseById,
createExpense,
deleteExpenseById,
updateExpenseById,
getExpensesSummary,
getExpenseSummary
}