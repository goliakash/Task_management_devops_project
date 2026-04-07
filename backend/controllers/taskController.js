const Task = require("../models/Task");

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

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      user: req.user.id,
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
