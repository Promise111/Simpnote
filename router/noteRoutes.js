const express = require("express");
const router = express.Router();
const {
  takeNote,
  home,
  notes,
  editNote,
  deleteNote,
} = require("../controller/noteController");

router.get("/", home);

router.get("/takenote", takeNote);

router.post("/takenote", takeNote);

router.get("/edit/:id", editNote);

router.post("/edit/:id", editNote);

router.get("/mynotes", notes);

router.post("/delete/:id", deleteNote);

module.exports = router;
