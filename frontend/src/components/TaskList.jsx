function TaskList({ tasks, onDelete, onComplete }) {
  if (tasks.length === 0) {
    return <div>No tasks available</div>
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <div className="task-actions">
            <button type="button">Edit</button>
            <button type="button" onClick={() => onDelete(task.id ?? task._id)}>
              Delete
            </button>
            <button
              type="button"
              onClick={() => onComplete(task.id ?? task._id)}
            >
              Complete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList
