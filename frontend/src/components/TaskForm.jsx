import { useState } from 'react'

function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Low')
  const [dueDate, setDueDate] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)

    try {
      await onSubmit({ title, description, priority, dueDate })
      setTitle('')
      setDescription('')
      setPriority('Low')
      setDueDate('')
    } catch (error) {
      alert(error.message || 'Unable to save task right now.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="task-title">Title</label>
      <input
        id="task-title"
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <label htmlFor="task-description">Description</label>
      <textarea
        id="task-description"
        rows="4"
        placeholder="Add a short description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <label htmlFor="task-priority">Priority</label>
      <select 
        id="task-priority"
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
        style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: '6px', marginBottom: '16px', fontSize: '14px' }}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <label htmlFor="task-due-date">Due Date</label>
      <input
        id="task-due-date"
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
      />

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Add Task'}
      </button>
    </form>
  )
}

export default TaskForm
