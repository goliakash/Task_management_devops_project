import { useState } from 'react'
import { MoreHorizontal, Paperclip, MessageSquare, Target } from 'lucide-react'

// Map statuses to standard columns
const COLUMNS = [
  { key: 'Backlog', label: 'Backlog', dotClass: 'col-backlog' },
  { key: 'To Do', label: 'To Do', dotClass: 'col-todo' },
  { key: 'In Progress', label: 'In Progress', dotClass: 'col-inprogress' },
  { key: 'Need Review', label: 'Need Review', dotClass: 'col-review' },
]

function getTaskId(task) {
  return task.id ?? task._id
}

function KanbanBoard({ tasks, onDelete, onMoveTask }) {
  const [dragTaskId, setDragTaskId] = useState(null)
  const [dragOverColumn, setDragOverColumn] = useState('')

  function getTasksByStatus(status) {
    return tasks.filter((task) => {
      // Handle mapping "Pending" from backend to "Backlog" or "To Do"
      const taskStatus = String(task.status || 'Backlog').toLowerCase();
      const colStatus = status.toLowerCase();
      if (colStatus === 'backlog' && taskStatus === 'pending') return true;
      if (colStatus === 'need review' && taskStatus === 'completed') return true;
      return taskStatus === colStatus;
    });
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

  if (!tasks || tasks.length === 0) {
    return <div className="empty-state" style={{width: '100%'}}>No tasks available on the board.</div>
  }

  return (
    <div className="kanban-board">
      {COLUMNS.map((column) => {
        const columnTasks = getTasksByStatus(column.key)

        return (
          <div
            key={column.key}
            className={`kanban-column ${column.dotClass}`}
            onDragOver={(event) => {
              event.preventDefault()
              setDragOverColumn(column.key)
            }}
            onDragLeave={() => setDragOverColumn('')}
            onDrop={(event) => handleDrop(event, column.key)}
          >
            <div className="column-header">
              <div className="col-title">
                <span className="col-dot"></span>
                {column.label}
              </div>
              <div className="col-options">
                <MoreHorizontal size={18} />
              </div>
            </div>

            <div className={`task-list ${dragOverColumn === column.key ? 'drag-over' : ''}`}>
              {columnTasks.map((task) => {
                const taskId = getTaskId(task)
                
                // Real DB values or fallbacks
                const priorityLevel = task.priority || 'Low';
                const priorityClass = `priority-${priorityLevel.toLowerCase()}`;
                
                const attachmentCount = task.attachmentCount || 0;
                const commentCount = task.commentCount || 0;

                // Generating a deterministic avatar based on ID size for aesthetics
                const u1 = (String(taskId).length || 0) % 70 + 1;
                const u2 = (String(taskId).length * 2 || 0) % 70 + 1;

                return (
                  <div
                    key={taskId}
                    className="task-card"
                    draggable
                    onDragStart={(event) => handleDragStart(event, taskId)}
                  >
                    <div className="card-header">
                      <div className={`priority-badge ${priorityClass}`}>
                        <Target size={12} /> {priorityLevel}
                      </div>
                      <div className="col-options" onClick={() => onDelete(taskId)} title="Delete Task">
                        <MoreHorizontal size={16} />
                      </div>
                    </div>
                    
                    <h3 className="card-title">{task.title}</h3>
                    <p className="card-desc">{task.description || 'No description added...'}</p>
                    
                    <div className="card-footer">
                      <div className="avatars-group" style={{transform: 'scale(0.85)', transformOrigin: 'left'}}>
                        <img src={`https://i.pravatar.cc/150?img=${u1}`} alt="User" />
                        <img src={`https://i.pravatar.cc/150?img=${u2}`} alt="User" />
                      </div>
                      <div className="card-stats">
                        <div className="stat-item"><Paperclip size={14} /> {attachmentCount}</div>
                        <div className="stat-item"><MessageSquare size={14} /> {commentCount}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default KanbanBoard
