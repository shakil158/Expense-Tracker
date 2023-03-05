import { ExpensesSummaryContext } from "../context/ExpensesSummaryContext"
import { useContext } from "react"

export const useExpensesSummaryContext = () => {
  const context = useContext(ExpensesSummaryContext)

  if(!context) {
    throw Error('useExpensesSummaryContext must be used inside a ExpensesSummaryContextProvider')
  }

  return context
}