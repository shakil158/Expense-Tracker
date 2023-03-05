const express = require('express');

const {getAllExpenses,
getExpenseById,
createExpense,
deleteExpenseById,
updateExpenseById,
getExpensesSummary,
getExpenseSummary
} = require('../controller/expenseController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// middleware auth to protect all endpoints
router.use(requireAuth)

//get all expenses
router.get('/', getAllExpenses)

// calc summary
router.get('/summary', getExpenseSummary)

//get expenses-summary
router.get('/summary1',getExpensesSummary)

//get expense by Id
router.get('/:id', getExpenseById)

//post a new expense
router.post('/', createExpense)

//delete expense by Id
router.delete('/:id', deleteExpenseById)

//update expense by Id
router.patch('/:id', updateExpenseById)




module.exports = router;