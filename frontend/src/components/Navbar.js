import { Link } from 'react-router-dom'

// import context and hooks
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

// Navbar component
const Navbar = () => {

  const { user } = useAuthContext()
  const { logout } = useLogout()

  // function to handle logout action
  const handleLogout = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Expense Tracker</h1>
        </Link>
        <nav>
          { user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}
          {!user && (
          <div className='login-section'>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar