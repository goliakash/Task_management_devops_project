import { useState } from 'react'
import TaskForm from './TaskForm'
import KanbanBoard from './KanbanBoard'
import { Lock, Plus, Search, AlignLeft, CalendarDays, LayoutTemplate, Share2, MoreHorizontal } from 'lucide-react'

function DashboardPage({
  loading,
  tasks,
  onAddTask,
  onDeleteTask,
  onMoveTask,
}) {
  const [showForm, setShowForm] = useState(false)

  const handleAddTask = async (taskData) => {
    await onAddTask(taskData)
    setShowForm(false)
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="breadcrumbs">
          Projects / Design / Mindlax App
        </div>
        
        <div className="project-title-row">
          <h1>Mindlax Redesign App</h1>
          <div className="project-actions">
            <button className="icon-btn-border"><Search size={16} /></button>
            <button className="icon-btn-border"><LayoutTemplate size={16} /></button>
            <button className="icon-btn-border"><Share2 size={16} /></button>
            <button className="icon-btn-border"><MoreHorizontal size={16} /></button>
          </div>
        </div>

        <div className="project-meta">
          <div className="meta-item">
            <span className="meta-label">Visibility</span>
            <div className="pill-light"><Lock size={12} /> Private Board</div>
          </div>
          
          <div className="meta-item">
            <span className="meta-label">Assigned to</span>
            <div className="avatars-group">
              <img src="https://i.pravatar.cc/150?img=12" alt="Talan" />
              <img src="https://i.pravatar.cc/150?img=5" alt="Lydia" />
              <img src="https://i.pravatar.cc/150?img=60" alt="Jordyn" />
              <img src="https://i.pravatar.cc/150?img=25" alt="Person" />
              <img src="https://i.pravatar.cc/150?img=33" alt="Person" />
              <div className="avatar-more">+4</div>
              <div className="avatar-more avatar-add"><Plus size={14} /></div>
            </div>
          </div>

          <div className="meta-item">
            <span className="meta-label">Deadline</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>29 Jun 2024 V</span>
          </div>

          <div className="meta-item">
            <span className="meta-label">Tags</span>
            <div className="tags-group">
              <span className="tag-blue">Mobile App Design</span>
              <span className="tag-orange">Redesign</span>
            </div>
          </div>
        </div>

        <div className="view-tabs-row">
          <div className="tabs-list">
            <button className="tab-btn"><LayoutTemplate size={16} /> Table</button>
            <button className="tab-btn active"><AlignLeft size={16} style={{transform: "rotate(90deg)"}}/> Board</button>
            <button className="tab-btn"><CalendarDays size={16} /> Timeline</button>
            <button className="tab-btn"><AlignLeft size={16} /> List</button>
          </div>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            <Plus size={16} /> Add new task
          </button>
        </div>
      </div>

      {showForm && (
        <div className="task-form-container">
          <h3>Create New Task</h3>
          <TaskForm onSubmit={handleAddTask} />
        </div>
      )}

      {loading ? (
        <div className="muted">Loading tasks...</div>
      ) : (
        <KanbanBoard
          tasks={tasks}
          onDelete={onDeleteTask}
          onMoveTask={onMoveTask}
        />
      )}
    </div>
  )
}

export default DashboardPage
