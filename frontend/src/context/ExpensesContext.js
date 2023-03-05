import { createContext, useReducer } from 'react'

export const ExpensesContext = createContext()

// expense reducer function
export const expensesReducer = (state, action) => {
  switch (action.type) {

    case 'SET_EXPENSES':
      return { 
        expenses: action.payload
      }
      
    case 'CREATE_EXPENSE':
      if(state.filtered)
      state.filtered = [action.payload, ...state.expenses]
      return { 
        expenses: [action.payload, ...state.expenses],
        filtered: state.filtered
      }

    case 'DELETE_EXPENSE':
      if(state.filtered){
        state.filtered =  state.filtered.filter(e => e._id !== action.payload._id) 
        }
      return { 
        expenses: state.expenses.filter(e => e._id !== action.payload._id),
        filtered: state.filtered
      }

    case 'EDIT_EXPENSE':
      console.log(action.payload)
      if(state.filtered){
        state.filtered =  state.filtered.filter(e => e._id !== action.payload._id)
        state.filtered = [action.payload, ...state.filtered]
      }
      state.expenses = state.expenses.filter(e => e._id !== action.payload._id)
      console.log('state_expenses', state.expenses)
      return { 
        expenses: [action.payload, ...state.expenses],
        filtered: state.filtered
      }
      
    case 'SORT_EXPENSES_DESC':
      console.log('desc sort triggered')
      const desc = action.payload.sortBy;
      
      state.expenses.sort(
        (p1, p2) => (
          p1[desc] < p2[desc]) ? 1 : (p1[desc] > p2[desc]) ? -1 : 0)

      if(state.filtered) {
        state.filtered.sort(
          (p1, p2) => (p1.desc < p2.desc) ? 1 : (p1.desc > [p2.desc]) ? -1 : 0)
        }
      return {
        expenses: state.expenses,
        filtered: state.filtered
      }
    
      case 'SORT_EXPENSES_ASC':
      const asc = action.payload.sortBy;
      
      state.expenses.sort(
        (p1, p2) => (
          p1[asc] > p2[asc]) ? 1 : (p1[asc] < p2[asc]) ? -1 : 0)

      if(state.filtered) {
        state.filtered.sort(
          (p1, p2) => (p1.asc > p2.asc) ? 1 : (p1.asc < [p2.asc]) ? -1 : 0)
        }
      return {
        expenses: state.expenses,
        filtered: state.filtered
      }

    case 'FILTER_EXPENSES':
      const result = action.payload.result;

      return {
        expenses: state.expenses,
        filtered: state.expenses.filter(e =>
          e.name.toLowerCase().includes(result.toLowerCase()) ||
          e.type.toLowerCase().includes(result.toLowerCase()) ||
          e.category.toLowerCase().includes(result.toLowerCase())
          
          )
      }

    case 'CLEAR_FILTER':
      return {
        expenses: state.expenses,
        filtered: null
      }

    default:
      return state
  }
}

export const ExpensesContextProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(expensesReducer, { 
    expenses: null,
    filtered: null
  })
  
  console.log('ExpenseContext state', state)

  return (
    <ExpensesContext.Provider value={{...state, dispatch}}>
      { children }
    </ExpensesContext.Provider>
  )
}