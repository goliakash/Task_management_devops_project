import { useState } from 'react'

const COLUMNS = [
  { key: 'Pending', label: 'Pending' },
  { key: 'In Progress', label: 'In Progress' },
  { key: 'Completed', label: 'Completed' },
]

function getTaskId(task) {
  return task.id ?? task._id
}

function KanbanBoard({ tasks, onDelete, onComplete, onMoveTask }) {
  const [dragTaskId, setDragTaskId] = useState(null)
  const [dragOverColumn, setDragOverColumn] = useState('')

  function getTasksByStatus(status) {
    return tasks.filter(
      (task) => String(task.status || 'Pending').toLowerCase() === status.toLowerCase(),
    )
  }

  function handleDragStart(event, taskId) {
    setDragTaskId(taskId)
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(taskId))
  }

  function handleDrop(event, status) {
    event.preventDefault()

    const droppedTaskId = dragTaskId ?? event.dataTransfer.getData('text/plain')

    if (!droppedTaskId) {
      return
    }

    onMoveTask(droppedTaskId, status)
    setDragTaskId(null)
    setDragOverColumn('')
  }

  if (tasks.length === 0) {
    return <div className="empty-state">No tasks available</div>
  }

  return (
    <div className="kanban-board">
      {COLUMNS.map((column) => {
        const columnTasks = getTasksByStatus(column.key)

        return (
          <div
            key={column.key}
            className={`kanban-column ${dragOverColumn === column.key ? 'drag-over' : ''}`}
            onDragOver={(event) => {
              event.preventDefault()
              setDragOverColumn(column.key)
            }}
            onDragLeave={() => setDragOverColumn('')}
            onDrop={(event) => handleDrop(event, column.key)}
          >
            <h4>{column.label}</h4>
            <p className="muted">{columnTasks.length} task(s)</p>

            {columnTasks.map((task) => {
              const taskId = getTaskId(task)
              const isCompleted = column.key === 'Completed'

              return (
                <div
                  key={taskId}
                  className="task-card"
                  draggable
                  onDragStart={(event) => handleDragStart(event, taskId)}
                >
                  <div className="task-card-top">
                    <h3>{task.title}</h3>
                  </div>
                  <p>{task.description || 'No description added.'}</p>
                  {task.dueDate ? (
                    <p className="muted">Due: {task.dueDate.slice(0, 10)}</p>
                  ) : null}
                  <div className="task-actions">
                    <button type="button" onClick={() => onDelete(taskId)}>
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => onComplete(taskId)}
                      disabled={isCompleted}
                    >
                      Complete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default KanbanBoard
