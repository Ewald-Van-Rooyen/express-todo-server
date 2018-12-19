const express = require("express");
const router = express.Router();

const todoController = require('../controllers/todo.controller');

router.get("/todo",todoController.getTodos);
router.post("/todo",todoController.createTodo);
router.put("/todo",todoController.updateTodo);
router.delete("/todo",todoController.deleteTodo);

module.exports = router;