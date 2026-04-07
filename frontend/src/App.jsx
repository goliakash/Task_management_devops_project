import { useEffect, useState } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import DashboardPage from './components/DashboardPage'
import AuthPage from './components/AuthPage'
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
      <Navigation onNavigate={setCurrentPage} />

      <main className="content">
        {currentPage === 'dashboard' ? (
          <DashboardPage
            loading={loading}
            tasks={filteredTasks}
            onFilterChange={setTaskFilter}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onCompleteTask={handleCompleteTask}
          />
        ) : currentPage === 'login' ? (
          <AuthPage title="Login" emailId="login-email" passwordId="login-password" />
        ) : (
          <AuthPage
            title="Register"
            emailId="register-email"
            passwordId="register-password"
          />
        )}
      </main>
    </div>
  )
}

export default App
