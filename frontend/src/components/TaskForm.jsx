function TaskForm() {
  return (
    <form className="task-form">
      <label htmlFor="task-title">Title</label>
      <input id="task-title" type="text" />

      <label htmlFor="task-description">Description</label>
      <textarea id="task-description" rows="4" />

      <label htmlFor="task-due-date">Due Date</label>
      <input id="task-due-date" type="date" />

      <button type="submit">Submit</button>
    </form>
  )
}

export default TaskForm
