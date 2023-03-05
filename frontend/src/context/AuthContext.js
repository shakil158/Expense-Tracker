import { createContext, useEffect, useReducer } from 'react'

export const AuthContext = createContext()

// auth reducer funtion
export const authReducer = (state, action) => {
  switch (action.type) {
    
    case 'LOGIN':
      return { 
        user: action.payload 
      }
    case 'LOGOUT':
      return { 
        user: null
      }
    default:
      return state
  }
}

// auth context provider
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { 
      state: null
    })

    // useEffect hook to update the user in auth context from the local browser storage
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'))

      if(user) {
        dispatch({type: 'LOGIN', payload: user})
      }

    },[])

    console.log('AuthContext state', state)
  
    return (
      <AuthContext.Provider value={{...state, dispatch}}>
        { children }
      </AuthContext.Provider>
    )
  }