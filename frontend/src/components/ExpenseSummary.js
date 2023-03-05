// expense summary component
const ExpenseSummary = ({ expense }) => {

  return (
    <div className="expense-summary">
      <div className="expenditure">
        <h4>TOTAL EXPENDITURE</h4>
        <strong>{expense.total_expenditure}</strong>
      </div>
      
      <div className="savings">
        <h4>TOTAL SAVINGS</h4>
        <strong>{expense.total_savings}</strong>
      </div>
    </div>
  )
}

export default ExpenseSummary