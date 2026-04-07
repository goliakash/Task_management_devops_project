const registerUser = (req, res) => {
  res.status(200).json({ message: "Register user placeholder" });
};

const loginUser = (req, res) => {
  res.status(200).json({ message: "Login user placeholder" });
};

module.exports = {
  registerUser,
  loginUser,
};
