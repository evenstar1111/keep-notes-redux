const Notes = require("../models/notes");
const { v4: uuidv4 } = require("uuid");

exports.createNote = async (req, res) => {
  try {
    const { title, description, label } = req.body;
    await Notes.findOne({ title }).exec((err, note) => {
      if (err) return res.json({ error: err });
      if (note)
        return res.json({
          error:
            "an item already exists with same title, please choose different title",
        });

      const _id = uuidv4();
      const user = uuidv4();
      const created = new Date().toISOString();

      const newNote = new Notes({
        _id,
        title,
        description,
        label,
        created,
        user,
      });
      newNote.save((err, success) => {
        if (err) return res.json({ error: err });
        return res.json({ note: success });
      });
    });
  } catch (e) {
    res.json({ error: e });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    await Notes.find().exec((err, notes) => {
      if (err) return res.json({ error: err });
      res.json(notes);
    });
  } catch (e) {
    res.json({ error: e });
  }
};

exports.getOneById = async (req, res) => {
  try {
    const { id } = req.body;
    await Notes.findById(id).exec((err, note) => {
      if (err) return res.json({ error: err });
      res.json({ note });
    });
  } catch (e) {
    res.json({ error: e });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.body;
    await Notes.findByIdAndDelete(id).exec((err, result) => {
      if (err) return res.json({ error: err });
      if (result === null) return res.json({ message: "item does not exist" });
      res.json({ message: "deleted successfully", result: result });
    });
  } catch (e) {
    res.json({ error: e });
  }
};

exports.editNote = async (req, res) => {
  try {
    const { _id, title, description, label, status } = req.body;
    await Notes.findOneAndUpdate(
      { _id },
      { title, description, label, status },
      { new: true }
    ).exec((err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result === null)
        return res.status(404).json({ error: "item could not be found" });
      res.json({ note: result });
    });
  } catch (e) {
    res.json({ error: e });
  }
};
