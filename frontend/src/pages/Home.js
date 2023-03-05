import { useEffect } from "react"
import { useExpensesContext } from "../hooks/useExpensesContext"
import { useExpensesSummaryContext } from "../hooks/useExpensesSummaryContext"

// components
import ExpenseDetails from "../components/ExpenseDetails"
import ExpenseSummary from "../components/ExpenseSummary"
import ExpenseForm from "../components/ExpenseForm"
import SortFilter from "../components/SortFilter"
import { useAuthContext } from "../hooks/useAuthContext"
import Search from "../components/Search"

const Home = () => {

  const { expenses, dispatch, filtered} = useExpensesContext()
  const { expensesSummary, dispatchSummary } = useExpensesSummaryContext()

  console.log("🚀 ~ file: Home.js:15 ~ Home ~ expenses:", expenses)
  
  
  const { user } = useAuthContext()
  
  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch('/api/expenses', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        dispatch({type: 'SET_EXPENSES', payload: json})
      }
    }

    const fetchExpenseSummary = async () => {
      const response = await fetch('/api/expenses/summary', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      console.log(json)
      if (response.ok) {
        dispatchSummary({type: 'SET_EXPENSES_SUMMARY', payload: json})
      }
    }


    if(user) {
    fetchExpenses()
    fetchExpenseSummary()
  
    }

  }, [dispatch,dispatchSummary,user])
  const result = filtered ? filtered : expenses

  return (
    
    <div className="home">
      <div className="expenses">
        <div className="expensesSummary">
          {expensesSummary && 
            <ExpenseSummary expense={expensesSummary} />  
          }
        </div>
        <div className="filters">
          
          <Search />
          <SortFilter />
        </div>
        
        
        <div className="expenses-list">
          {result && !result.length && <h2>No Expenses Found</h2>}
          {result && result.map(expense => (
          <ExpenseDetails expense={expense} key={expense._id} />
          ))}
        </div>

      </div> 
      
      <ExpenseForm />
              
    </div>
       
  )
}

export default Home