import TaskForm from './TaskForm'
import TaskList from './TaskList'

function DashboardPage({
  loading,
  tasks,
  onFilterChange,
  onAddTask,
  onDeleteTask,
  onCompleteTask,
}) {
  return (
    <div className="dashboard-page">
      <h2>My Tasks</h2>
      <div className="task-filters">
        <button type="button" onClick={() => onFilterChange('all')}>
          All
        </button>
        <button type="button" onClick={() => onFilterChange('completed')}>
          Completed
        </button>
        <button type="button" onClick={() => onFilterChange('pending')}>
          Pending
        </button>
      </div>
      <div>
        <button type="button">Add Task</button>
      </div>
      <TaskForm onSubmit={onAddTask} />
      {loading ? <div>Loading tasks...</div> : null}
      {!loading ? (
        <TaskList
          tasks={tasks}
          onDelete={onDeleteTask}
          onComplete={onCompleteTask}
        />
      ) : null}
    </div>
  )
}

export default DashboardPage
