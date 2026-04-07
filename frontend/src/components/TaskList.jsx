function TaskList({ tasks }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <div className="task-actions">
            <button type="button">Edit</button>
            <button type="button">Delete</button>
            <button type="button">Complete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList
