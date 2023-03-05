import { useState } from "react"

// import hooks
import { useExpensesContext } from '../hooks/useExpensesContext'

// search component
const Search = () => {

  const { dispatch } = useExpensesContext()
  const [search, setSearch] = useState('')
  
  // function to update the expense context based on search value
  const updateSearch = (e) => {
    if(e !== '') {
      dispatch({type: 'FILTER_EXPENSES',payload: {'result': e}})
    }
    else {
      dispatch({type: 'CLEAR_FILTER'})
    } 
  }

  return (
    <div className="search">
        
      <input 
        type="text"
        value = {search}
        placeholder="Search by Name, type, Category"
        onKeyDown={(e) => {
            setSearch(e.target.value)
            updateSearch(e.target.value)
        }}
        onChange={(e) => {
            setSearch(e.target.value)
            updateSearch(e.target.value)
        }}
      />
    </div>
  )
}

export default Search