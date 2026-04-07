const getTasks = (req, res) => {
  res.status(200).json({ message: "Get tasks placeholder" });
};

const createTask = (req, res) => {
  res.status(201).json({ message: "Create task placeholder" });
};

module.exports = {
  getTasks,
  createTask,
};
