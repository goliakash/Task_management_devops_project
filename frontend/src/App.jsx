import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DashboardPage from './components/DashboardPage'
import AuthPage from './components/AuthPage'
import {
  clearToken,
  createTask,
  deleteTask,
  getTasks,
  getToken,
  login,
  register,
  updateTask,
} from './services/api'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getToken()))
  const [currentPage, setCurrentPage] = useState(
    isAuthenticated ? 'dashboard' : 'login',
  )
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      setTasks([])

      if (currentPage === 'dashboard') {
        setCurrentPage('login')
      }

      return
    }

    if (currentPage !== 'dashboard') {
      return
    }

    let isActive = true

    async function loadTasks() {
      setLoading(true)

      try {
        const data = await getTasks()
        const taskList = Array.isArray(data) ? data : data?.tasks || []

        if (isActive) {
          setTasks(taskList)
        }
      } catch {
        alert('Could not load tasks.')
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    loadTasks()

    return () => {
      isActive = false
    }
  }, [currentPage, isAuthenticated])

  async function handleLogin(credentials) {
    try {
      await login(credentials)
      setIsAuthenticated(true)
      setCurrentPage('dashboard')
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Login failed.'
      throw new Error(errorMessage)
    }
  }

  async function handleRegister(userData) {
    try {
      await register(userData)
      alert('Registration successful. Please log in.')
      setCurrentPage('login')
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || 'Registration failed.'
      throw new Error(errorMessage)
    }
  }

  function handleLogout() {
    clearToken()
    setIsAuthenticated(false)
    setTasks([])
    setCurrentPage('login')
  }

  function getTaskId(task) {
    return task.id ?? task._id
  }

  async function handleAddTask(taskData) {
    try {
      const newTaskData = {
        ...taskData,
        status: 'Backlog', // Updated default status to match new columns
      }
      const data = await createTask(newTaskData)
      const createdTask = data?.task || data
      setTasks((currentTasks) => [...currentTasks, createdTask])
    } catch {
      throw new Error('Task could not be added. Please try again.')
    }
  }

  async function handleDeleteTask(taskId) {
    try {
      await deleteTask(taskId)
      setTasks((currentTasks) =>
        currentTasks.filter((task) => getTaskId(task) !== taskId),
      )
    } catch {
      alert('Could not delete task.')
    }
  }


  async function handleMoveTask(taskId, newStatus) {
    const currentTask = tasks.find((task) => getTaskId(task) === taskId)

    if (!currentTask) {
      return
    }

    const updatedTask = {
      ...currentTask,
      status: newStatus,
      completed: String(newStatus).toLowerCase() === 'completed' || String(newStatus).toLowerCase() === 'need review',
    }

    try {
      const data = await updateTask(taskId, updatedTask)
      const savedTask = data?.task || data || updatedTask

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          getTaskId(task) === taskId ? savedTask : task,
        ),
      )
    } catch {
      alert('Could not update task.')
    }
  }

  return (
    <div className="app">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="main-wrapper">
        <Header />
        
        <div className="content">
          {currentPage === 'dashboard' ? (
            <DashboardPage
              loading={loading}
              tasks={tasks}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
              onMoveTask={handleMoveTask}
            />
          ) : currentPage === 'login' ? (
            <AuthPage title="Login" emailId="login-email" passwordId="login-password" />
          ) : currentPage === 'register' ? (
            <AuthPage
              title="Register"
              emailId="register-email"
              passwordId="register-password"
            />
          ) : (
            <div className="placeholder-page">
              <h2>{currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} Page</h2>
              <p>This page is not yet implemented in the demo.</p>
            </div>
          )}
        </div>
      <Navigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      <main className="content">
        {isAuthenticated && currentPage === 'dashboard' ? (
          <DashboardPage
            loading={loading}
            allTasks={tasks}
            tasks={tasks}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onCompleteTask={handleCompleteTask}
            onMoveTask={handleMoveTask}
          />
        ) : currentPage === 'login' ? (
          <AuthPage
            title="Login"
            emailId="login-email"
            passwordId="login-password"
            onSubmit={handleLogin}
            submitLabel="Login"
          />
        ) : (
          <AuthPage
            title="Register"
            emailId="register-email"
            passwordId="register-password"
            onSubmit={handleRegister}
            submitLabel="Register"
          />
        )}
      </main>
    </div>
  )
}

export default App
