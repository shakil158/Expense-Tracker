import { useState } from "react"

// import expense context
import { useExpensesContext } from '../hooks/useExpensesContext'

// Sort Filter component
const SortFilter = () => {

  const { dispatch } = useExpensesContext()

  const [sort, setSort] = useState('createdAtDesc');

  // function to update the expense context based on sort criteria
  const updateSort = (e) => {

    if(e === 'createdAtDesc')
      dispatch({type: 'SORT_EXPENSES_DESC',payload: {'sortBy': 'createdAt'}})
    else if (e === 'amountDesc')
      dispatch({type: 'SORT_EXPENSES_DESC',payload: {'sortBy': 'amount'}})
    else
      dispatch({type: 'SORT_EXPENSES_ASC',payload: {'sortBy': e}})

  }

  return (
    <div className="SortFilter">

      <label>Sort By: </label>
      <select 
        id="sort" 
        name="sort"
        onChange={(e) => {
          setSort(e.target.value)
          updateSort(e.target.value)
        }} 
        value={sort}
      >
        <option value="createdAtDesc">Created (New to Old)</option>
        <option value="createdAt">Created (Old to New)</option>
        <option value="name">Name</option>
        <option value="type">Type</option>
        <option value="category">Category</option>
        <option value="amountDesc">Amount (High to Low)</option>
        <option value="amount">Amount (Low to High)</option>
      </select>
      
    </div>
  )
}

export default SortFilter