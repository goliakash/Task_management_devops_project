const Task = require("../models/Task");

const REQUIRED_TASK_FIELDS = ["title"];

const getMissingTaskFields = (payload) =>
  REQUIRED_TASK_FIELDS.filter((field) => {
    const value = payload[field];
    if (typeof value === "string") {
      return !value.trim();
    }
    return value === undefined || value === null;
  });

const validateTaskInput = ({ title, description, status, priority, dueDate }) => {
  const missingFields = getMissingTaskFields({ title });
  if (missingFields.length > 0) {
    return { message: `${missingFields.join(", ")} is required` };
  }

  if (typeof title !== "string") {
    return { message: "Title must be a string" };
  }

  if (!title.trim()) {
    return { message: "Title is required" };
  }

  if (description !== undefined && typeof description !== "string") {
    return { message: "Description must be a string" };
  }

  if (status !== undefined && !["Backlog", "To Do", "In Progress", "Need Review", "Completed"].includes(status)) {
    return { message: "Status must be one of Backlog, To Do, In Progress, Need Review, Completed" };
  }

  if (priority !== undefined && !["High", "Medium", "Low"].includes(priority)) {
    return { message: "Priority must be High, Medium, or Low" };
  }

  if (dueDate !== undefined && Number.isNaN(new Date(dueDate).getTime())) {
    return { message: "Invalid dueDate" };
  }

  return null;
};

const buildTaskPayload = ({ title, description, status, priority, dueDate, userId }) => ({
  title: title.trim(),
  description,
  status,
  priority,
  dueDate,
  user: userId,
});

const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user", "email");
    return res.status(200).json(tasks);
  } catch (error) {
    return next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const validationError = validateTaskInput({ title, description, status, priority, dueDate });

    if (validationError) {
      return res.status(400).json({ message: validationError.message });
    }

    const task = await Task.create(buildTaskPayload({
      title,
      description,
      status,
      priority,
      dueDate,
      userId: req.user.id,
    }));

    return res.status(201).json(task);
  } catch (error) {
    return next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;
    
    // We only validate fields that are provided, but since title is required we conditionally validate if title is in the request body
    if (title !== undefined) {
      const validationError = validateTaskInput({ title, description, status, priority, dueDate });
      if (validationError) {
        return res.status(400).json({ message: validationError.message });
      }
    } else {
      // Validate individual optional fields
      if (status !== undefined && !["Backlog", "To Do", "In Progress", "Need Review", "Completed"].includes(status)) {
        return res.status(400).json({ message: "Status must be one of Backlog, To Do, In Progress, Need Review, Completed" });
      }
      if (priority !== undefined && !["High", "Medium", "Low"].includes(priority)) {
        return res.status(400).json({ message: "Priority must be High, Medium, or Low" });
      }
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, description, status, priority, dueDate },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ task });
  } catch (error) {
    return next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
