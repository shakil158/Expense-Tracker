import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useState } from 'react'

// import contexts and hooks
import { useExpensesContext } from '../hooks/useExpensesContext'
import { useExpensesSummaryContext } from "../hooks/useExpensesSummaryContext"
import { useExpenseController } from '../hooks/useExpenseController'
import { useAuthContext } from '../hooks/useAuthContext'

// component to render expenses in home page
const ExpenseDetails = ({ expense }) => {
  const [expand, setExpand] = useState(false)
  const buttonText = expand? 'Close': 'More';

  // edit expense attributes states
  const [edit,setEdit] = useState(false)
  const [name, setName] = useState(expense.name);
  const [date, setDate] = useState(expense.createdAt.substring(0,10));
  const [type, setType] = useState(expense.type);
  const [category, setCategory] = useState(expense.category);
  const [amount, setAmount] = useState(expense.amount);
  const [description, setDescription] = useState(expense.description);
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const { dispatch } = useExpensesContext()
  const { dispatchSummary } = useExpensesSummaryContext()
  const {deleteExpense, updateExpenseById} = useExpenseController()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if( !user ) {
      return
    }

    const response = await deleteExpense(expense._id, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_EXPENSE', payload: json})
      await updateSummary();
    }
    
  }

  const updateSummary = async() => {
    const summary = {type:expense.type, amount:expense.amount, operation:'sub'}
    
    if(summary.type === 'Expenditure') {
      dispatchSummary({type: 'UPDATE_EXPENDITURE', payload: summary})
      }
    else {
      dispatchSummary({type: 'UPDATE_SAVINGS', payload: summary})
    }
    }

  // controller function to modify the edit state
  const handleEdit  = () => {
    setEdit(true)
  }

  // function to cancel the edit operation
  const handleCancel = () => {
    setEdit(false)
  }

  // function to save the edit
  const handleSave = async() => {
    if( !user ) {
      return
    }

    const updated_expense = {name, type, category, amount, date, description}
    const response = await updateExpenseById(expense._id, updated_expense)
    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
  
    if (response.ok) {
      // dispatch to modify the expense context state
      dispatch({type: 'EDIT_EXPENSE', payload: json})
      setEdit(false)
    }
    
  }
  
  // conditionally renders component based on edit state
  return !edit ? (
    
    // renders when edit is disabled
    <div className="expense-details">
  
      <h4>{expense.name}</h4>
      <p><strong>Category : </strong>{expense.category}</p>
      <p><strong>Amount : </strong>{expense.amount}</p>
      <i>{formatDistanceToNow(new Date(expense.createdAt), { addSuffix: true })}</i>

      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      <button onClick={() => {setExpand(!expand)}}>{buttonText}</button>
      <button onClick={handleEdit}>Edit</button>
      {expand && 
        <div className="expand">
          <p><strong>Type : </strong>{expense.type}</p>
          <p><strong>Created : </strong>{expense.date.substring(0,10)}</p>
          <p><strong>Description : </strong>{expense.description !== '' ? expense.description : '--'}</p>
        </div>   
      }

    </div>
  ) : 
  // renders when edit is enabled
  (
    <div className="edit-expense">
      
      <strong>Name</strong>
      <input
        type="text" 
        id="name"
        name="name" 
        required
        onChange={(e) => setName(e.target.value)} 
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <strong>Category : </strong>
      <select 
        id="category" 
        name="category"
        required
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
  
      <strong>Amount : </strong>
      <input
        type="number" 
        id="amount" 
        name="amount"
        required
        onChange={(e) => setAmount(e.target.value)} 
        value={amount}
        className={emptyFields.includes('amount') ? 'error' : ''}
      />

      <strong>Type : </strong>
      <select 
        id="type" 
        name="type"
        required
        onChange={(e) => setType(e.target.value)} 
        value={type}
        className={emptyFields.includes('type') ? 'error' : ''}
      >
        <option value="Expenditure">Expenditure</option>
        <option value="Savings">Savings</option>
      </select>

      <strong>Created : </strong>
      <input
        type="date"
        id="date" 
        name="date"
        required
        onChange={(e) => setDate(e.target.value)} 
        value={date}
        className={emptyFields.includes('date') ? 'error' : ''}
      />

      <strong>Description : </strong>
      <textarea
        id="description"
        name="description"
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
      />

      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default ExpenseDetails