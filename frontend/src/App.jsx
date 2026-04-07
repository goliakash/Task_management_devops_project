import { useState } from 'react'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  return (
    <div className="app">
      <nav className="navbar">
        <h1>Task Manager</h1>
        <div className="nav-links">
          <button type="button" onClick={() => setCurrentPage('dashboard')}>
            Dashboard
          </button>
          <button type="button" onClick={() => setCurrentPage('login')}>
            Login
          </button>
          <button type="button" onClick={() => setCurrentPage('register')}>
            Register
          </button>
        </div>
      </nav>

      <main className="content">
        {currentPage === 'dashboard' ? (
          <div className="dashboard-page">
            <h2>My Tasks</h2>
            <div>
              <button type="button">Add Task</button>
            </div>
            <div>No tasks available</div>
          </div>
        ) : currentPage === 'login' ? (
          <section className="form-page">
            <h2>Login</h2>
            <form className="auth-form">
              <label htmlFor="login-email">Email</label>
              <input id="login-email" type="email" />

              <label htmlFor="login-password">Password</label>
              <input id="login-password" type="password" />

              <button type="submit">Submit</button>
            </form>
          </section>
        ) : (
          <section className="form-page">
            <h2>Register</h2>
            <form className="auth-form">
              <label htmlFor="register-email">Email</label>
              <input id="register-email" type="email" />

              <label htmlFor="register-password">Password</label>
              <input id="register-password" type="password" />

              <button type="submit">Submit</button>
            </form>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
