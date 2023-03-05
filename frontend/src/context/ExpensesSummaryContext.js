import { createContext, useReducer } from 'react'

export const ExpensesSummaryContext = createContext()

// expense summary reducer function
export const expensesSummaryReducer = (summarystate, action) => {
  switch (action.type) {

    case 'SET_EXPENSES_SUMMARY':
      return { 
        expensesSummary: action.payload,
      }
    
    case 'UPDATE_EXPENDITURE':
      if(action.payload.operation === 'add')
      summarystate.expensesSummary['total_expenditure']+= parseInt(action.payload.amount)

      else
      summarystate.expensesSummary['total_expenditure']-= parseInt(action.payload.amount)
      return { 
        expensesSummary: summarystate.expensesSummary
      }
    
    case 'UPDATE_SAVINGS':
      if(action.payload.operation === 'add')
      summarystate.expensesSummary['total_savings']+= parseInt(action.payload.amount)

      else
      summarystate.expensesSummary['total_savings']-= parseInt(action.payload.amount)

      return { 
        expensesSummary: summarystate.expensesSummary
      }

    default:
      return summarystate
  }
}

export const ExpensesSummaryContextProvider = ({ children }) => {
  
  const [summarystate, dispatchSummary] = useReducer(expensesSummaryReducer, {
    expensesSummary: null
  })
  
  console.log('ExpenseSummaryContext state', summarystate)

  return (
    <ExpensesSummaryContext.Provider value={{...summarystate, dispatchSummary}}>
      { children }
    </ExpensesSummaryContext.Provider>
  )
}