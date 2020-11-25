const router = require("express").Router();
const {
  createNote,
  deleteNote,
  editNote,
  getAllNotes,
  getOneById,
} = require("../controllers/notes");
const {
  validateCreateInput,
  validateEditInput,
} = require("../validators/notes");
const { validationCheckResult } = require("../validators/index");

router.post(
  "/notes/create",
  validateCreateInput,
  validationCheckResult,
  createNote
);
router.get("/notes", getAllNotes);
router.get("/notes/note", getOneById);
router.delete("/notes/delete", deleteNote);
router.put("/notes/update", validateEditInput, validationCheckResult, editNote);

module.exports = router;
