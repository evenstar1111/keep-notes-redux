const router = require("express").Router()
const {
  createTodo,
  getAllTodos,
  deleteTodo,
  editTodo,
  getOneById,
} = require("../controllers/todos")
const {
  validateCreateInput,
  validateEditInput,
} = require("../validators/todos")
const { validationCheckResult } = require("../validators/index")

router.post(
  "/todos/create",
  validateCreateInput,
  validationCheckResult,
  createTodo
)
router.get("/todos", getAllTodos)
router.get("/todos/todo", getOneById)
router.delete("/todos/delete", deleteTodo)
router.put("/todos/update", validateEditInput, validationCheckResult, editTodo)

module.exports = router
