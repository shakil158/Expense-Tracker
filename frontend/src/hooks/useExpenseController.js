import { useAuthContext } from "./useAuthContext"

export const useExpenseController = () => {
    
    const {user} = useAuthContext()
    const createExpense = async(expense) => {
        const response = await fetch('/api/expenses', {
            method: 'POST',
            body: JSON.stringify(expense),
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`

            }
        })
        console.log(response)
        return response
    }

    const deleteExpense = async(id) => {
        const response = await fetch('/api/expenses/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
              }
        })
        return response
    }

    const updateExpenseById = async(id, expense) => {
        console.log('id',id, expense)
        const response = await fetch('/api/expenses/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
              },
            body: JSON.stringify(expense),
        })
        return response
    }

    return {createExpense, deleteExpense, updateExpenseById}
}