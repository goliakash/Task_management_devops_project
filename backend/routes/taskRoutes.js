const express = require("express");
const { getTasks, createTask } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", getTasks);
router.post("/", createTask);

module.exports = router;
