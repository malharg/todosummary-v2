const express = require("express");
const router = express.Router();
const {
  getTodos,
  addTodo,
  deleteTodo,
} = require("../controllers/todoController");
const { summarizeTodos } = require("../controllers/todoController");

router.get("/", getTodos);
router.post("/", addTodo);
router.delete("/:id", deleteTodo);
router.post("/summarize", summarizeTodos);
module.exports = router;
