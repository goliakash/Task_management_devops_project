import { useState } from 'react'

function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit({ title, description, dueDate })
    setTitle('')
    setDescription('')
    setDueDate('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="task-title">Title</label>
      <input
        id="task-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="task-description">Description</label>
      <textarea
        id="task-description"
        rows="4"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <label htmlFor="task-due-date">Due Date</label>
      <input
        id="task-due-date"
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  )
}

export default TaskForm
