function Navigation({ onNavigate }) {
  return (
    <nav className="navbar">
      <h1>Task Manager</h1>
      <div className="nav-links">
        <button type="button" onClick={() => onNavigate('dashboard')}>
          Dashboard
        </button>
        <button type="button" onClick={() => onNavigate('login')}>
          Login
        </button>
        <button type="button" onClick={() => onNavigate('register')}>
          Register
        </button>
      </div>
    </nav>
  )
}

export default Navigation
