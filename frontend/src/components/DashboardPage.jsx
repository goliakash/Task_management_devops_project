import TaskForm from './TaskForm'
import KanbanBoard from './KanbanBoard'

function DashboardPage({
  loading,
  allTasks,
  tasks,
  onAddTask,
  onDeleteTask,
  onCompleteTask,
  onMoveTask,
}) {
  const completedCount = allTasks.filter(
    (task) => String(task.status || '').toLowerCase() === 'completed',
  ).length
  const pendingCount = allTasks.filter(
    (task) => String(task.status || '').toLowerCase() === 'pending',
  ).length
  const inProgressCount = allTasks.filter(
    (task) => String(task.status || '').toLowerCase() === 'in progress',
  ).length

  return (
    <div className="dashboard-page">
      <section className="panel">
        <h2>My Tasks</h2>
        <p className="muted">Track your tasks and stay organized.</p>
        <div className="task-summary">
          <span>Total: {allTasks.length}</span>
          <span>Completed: {completedCount}</span>
          <span>In Progress: {inProgressCount}</span>
          <span>Pending: {pendingCount}</span>
        </div>
      </section>

      <section className="panel">
        <h3>Create Task</h3>
        <TaskForm onSubmit={onAddTask} />
      </section>

      <section className="panel">
        <h3>Task Board</h3>
        {loading ? <div className="muted">Loading tasks...</div> : null}
        {!loading ? (
          <KanbanBoard
            tasks={tasks}
            onDelete={onDeleteTask}
            onComplete={onCompleteTask}
            onMoveTask={onMoveTask}
          />
        ) : null}
      </section>
    </div>
  )
}

export default DashboardPage
