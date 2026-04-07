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

const validateTaskInput = ({ title, description, status, dueDate }) => {
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

  if (status !== undefined && !["pending", "completed"].includes(status)) {
    return { message: "Status must be pending or completed" };
  }

  if (dueDate !== undefined && Number.isNaN(new Date(dueDate).getTime())) {
    return { message: "Invalid dueDate" };
  }

  return null;
};

const buildTaskPayload = ({ title, description, status, dueDate, userId }) => ({
  title: title.trim(),
  description,
  status,
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
    const { title, description, status, dueDate } = req.body;
    const validationError = validateTaskInput({ title, description, status, dueDate });

    if (validationError) {
      return res.status(400).json({ message: validationError.message });
    }

    const task = await Task.create(buildTaskPayload({
      title,
      description,
      status,
      dueDate,
      userId: req.user.id,
    }));

    return res.status(201).json(task);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getTasks,
  createTask,
};
