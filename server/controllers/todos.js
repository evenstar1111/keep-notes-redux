const Todo = require("../models/todos");
const { v4: uuidv4 } = require("uuid");

exports.createTodo = async (req, res) => {
  try {
    const { title, description, label } = req.body;
    await Todo.findOne({ title }).exec((err, todo) => {
      if (err) return res.json({ error: err });
      if (todo)
        return res.json({
          error:
            "an item already exists with same title, please choose different title",
        });

      const _id = uuidv4();
      const user = uuidv4();
      const created = new Date().toISOString()

      const newTodo = new Todo({ _id, title, description, label, created, user });
      newTodo.save((err, success) => {
        if (err) return res.json({ error: err });
        return res.json({ todo: success });
      });
    });
  } catch (e) {
    res.json({ error: e });
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    await Todo.find().exec((err, todos) => {
      if (err) return res.json({ error: err });
      res.json(todos);
    });
  } catch (e) {
    res.json({ error: e });
  }
};

exports.getOneById = async (req, res) => {
  try {
    const { id } = req.body;
    await Todo.findById(id).exec((err, todo) => {
      if (err) return res.json({ error: err });
      res.json({ todo });
    });
  } catch (e) {
    res.json({ error: e });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.body;
    await Todo.findByIdAndDelete(id).exec((err, result) => {
      if (err) return res.json({ error: err });
      if (result === null) return res.json({ message: "item does not exist" });
      res.json({ message: "deleted successfully", result: result });
    });
  } catch (e) {
    res.json({ error: e });
  }
};

exports.editTodo = async (req, res) => {
  try {
    const { _id, title, description, label, status } = req.body;
    await Todo.findOneAndUpdate(
      { _id },
      { title, description, label, status },
      { new: true }
    ).exec((err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result === null)
        return res.status(404).json({ error: "item could not be found" });
      res.json({ todo: result });
    });
  } catch (e) {
    res.json({ error: e });
  }
};
