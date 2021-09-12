const { validator, noteModel } = require("../model/note");
const _ = require("../utils/loadash");

exports.takeNote = async (req, res) => {
  var body = req.body;
  let { error } = validator(body);

  if (req.method === "POST") {
    if (!error) {
      body.user = "612a768f072b9923191b4a1f";
      const note = new noteModel(body);
      note.save();
      res.redirect("/simpnotes/mynotes");
    }
  }

  return res.render("./note/takenote", {
    title: "Simpnotes | Take Note",
    error: error && req.method === "POST" ? error.details[0].message : "",
    date: new Date().toLocaleTimeString(),
    path: "takenote",
    body: body,
  });
};

exports.home = async (req, res) => {
  return res.status(200).render("./note/index", {
    title: "Simpnotes | Home",
    date: new Date().toLocaleTimeString(),
    path: "home",
  });
};

exports.editNote = async (req, res) => {
  var body = req.body;
  let { error } = validator(body);

  const note = await noteModel
    .findById(req.params.id)
    .select("subject body category");

  if (!_.isEmpty(body)) {
    body._id = req.params.id;
  }

  if (req.method === "POST" && !error) {
    const note = await noteModel.findById(req.params.id);
    note.subject = body.subject;
    note.body = body.body;
    note.category = body.category;
    note.updatedAt = new Date().toISOString();
    await note.save();
    return res.redirect("/simpnotes/mynotes");
  }

  return res.render("./note/editnote", {
    title: "Simpnotes | Edit Note",
    error: error && req.method === "POST" ? error.details[0].message : "",
    path: "editnote",
    body: _.isEmpty(body) ? note : body,
  });
};

exports.notes = async (req, res) => {
  const notes = await noteModel
    .find()
    .sort("title")
    .select("subject category body createdAt");
  return res.render("./note/mynotes", {
    title: "Simpnotes | My Notes",
    notes: notes,
    path: "notes",
  });
};

exports.deleteNote = async (req, res) => {
  const note = await noteModel.findByIdAndDelete(req.params.id);
  return res.redirect("/simpnotes/mynotes");
};
