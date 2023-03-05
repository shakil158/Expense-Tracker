import { useAuthContext } from './useAuthContext'
import { useExpensesContext } from './useExpensesContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const {dispatch: ExpenseDispatch} = useExpensesContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })

    ExpenseDispatch({type: 'SET_EXPENSES', payload: null})
  }

  return { logout }
}