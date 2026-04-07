import { useEffect, useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { createTask, deleteTask, getTasks, updateTask } from './services/api'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [taskFilter, setTaskFilter] = useState('all')

  useEffect(() => {
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
  }, [currentPage])

  function getTaskId(task) {
    return task.id ?? task._id
  }

  function getTaskStatus(task) {
    return String(task.status || '').toLowerCase()
  }

  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === 'completed') {
      return getTaskStatus(task) === 'completed'
    }

    if (taskFilter === 'pending') {
      return getTaskStatus(task) === 'pending'
    }

    return true
  })

  async function handleAddTask(taskData) {
    try {
      const data = await createTask(taskData)
      const createdTask = data?.task || data
      setTasks((currentTasks) => [...currentTasks, createdTask])
    } catch {
      throw new Error('Could not add task.')
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

  async function handleCompleteTask(taskId) {
    const currentTask = tasks.find((task) => getTaskId(task) === taskId)

    if (!currentTask) {
      return
    }

    const updatedTask = {
      ...currentTask,
      status: 'Completed',
      completed: true,
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
            <div className="task-filters">
              <button type="button" onClick={() => setTaskFilter('all')}>
                All
              </button>
              <button type="button" onClick={() => setTaskFilter('completed')}>
                Completed
              </button>
              <button type="button" onClick={() => setTaskFilter('pending')}>
                Pending
              </button>
            </div>
            <div>
              <button type="button">Add Task</button>
            </div>
            <TaskForm onSubmit={handleAddTask} />
            {loading ? <div>Loading tasks...</div> : null}
            {!loading ? (
              <TaskList
                tasks={filteredTasks}
                onDelete={handleDeleteTask}
                onComplete={handleCompleteTask}
              />
            ) : null}
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
