const Task = require("../models/Task");

const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate("user", "email");
    return res.status(200).json(tasks);
  } catch (error) {
    return next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, status, dueDate, user } = req.body;

    if (!title || !user) {
      return res.status(400).json({ message: "Title and user are required" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      user,
    });

    return res.status(201).json(task);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getTasks,
  createTask,
};
