import { useState } from 'react'

// // import contexts and hooks
import { useAuthContext } from '../hooks/useAuthContext';
import { useExpensesContext } from '../hooks/useExpensesContext'
import { useExpensesSummaryContext } from '../hooks/useExpensesSummaryContext'
import { useExpenseController} from '../hooks/useExpenseController';

// component to render the expense form
const ExpenseForm = () => {

  // controllers and context
  const {createExpense} = useExpenseController()
  const { dispatch} = useExpensesContext()
  const { dispatchSummary } = useExpensesSummaryContext()
  const { user } = useAuthContext()

  // set current date in form
  let curr = new Date();
  curr.setDate(curr.getDate());
  let current_date = curr.toISOString().substring(0,10);
  
  // initital states of all fields in form
  const [name, setName] = useState('');
  const [date, setDate] = useState(current_date);
  const [type, setType] = useState('Expenditure');
  const [category, setCategory] = useState('Expenditure');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  // function to handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    // checking user
    if( !user ) {
      setError('You must be logged in')
      return
    }

    const expense = {name, type, category, amount, date, description}

    // REST API call to add an expense to db
    const response = await createExpense(expense, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setName('')
      setType('Expenditure')
      setCategory('Expenditure')
      setAmount(0)
      setDate(current_date)
      setDescription('')

      // update expense context state
      dispatch({type: 'CREATE_EXPENSE', payload: json})

      // update local expense summary context
      await updateSummary();
    }
    
  }

  // function to update expense summary context after inserting into db
  const updateSummary = async() => {
    
    const summary = {type, amount, operation:'add'}
  
    if(type === 'Expenditure') {
      dispatchSummary({type: 'UPDATE_EXPENDITURE', payload: summary})
      }
    else {
      dispatchSummary({type: 'UPDATE_SAVINGS', payload: summary})
    }
  }
  

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>ADD A NEW EXPENSE</h3>
      <label htmlFor="name">Expense Name:</label>
      <input
        type="text" 
        id="name"
        name="name" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />
        
      <label htmlFor="type">Expense Type: </label>
      <select 
        id="type" 
        name="type"
        onChange={(e) => setType(e.target.value)} 
        value={type}
        className={emptyFields.includes('type') ? 'error' : ''}
      >
        <option value="Expenditure">Expenditure</option>
        <option value="Savings">Savings</option>
      </select>

      <label htmlFor='category'>Expense Category: </label>
      <select 
        id="category" 
        name="category"
        onChange={(e) => setCategory(e.target.value)} 
        value={category}
        className={emptyFields.includes('category') ? 'error' : ''}
      >
        <option value="Shopping">Expenditure</option>
        <option value="Savings">Savings</option>
        <option value="Bill Payment">Bill Payment</option>
        <option value="Education">Education</option>
        <option value="Food">Food</option>
        <option value="Home">Home</option>
      </select>

      <label htmlFor="amount">Expense Amount:</label>
      <input
        type="text" 
        id="amount" 
        name="amount"
        onChange={(e) => setAmount(e.target.value)} 
        value={amount}
        className={emptyFields.includes('amount') ? 'error' : ''}
      />
        
      <label htmlFor="date">Expense Date:</label>
      <input
        type="date"
        id="date" 
        name="date"
        onChange={(e) => setDate(e.target.value)} 
        value={date}
        className={emptyFields.includes('date') ? 'error' : ''}
      />

      <label htmlFor="description">Expense Description:</label>
      <textarea
        id="description"
        name="description"
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
      />

      <button>Add Expense</button>
      {error && <div className="error">{error}</div>}
      
    </form>
  )
}

export default ExpenseForm