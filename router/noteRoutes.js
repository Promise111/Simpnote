const express = require("express");
const router = express.Router();
const {
  takeNote,
  home,
  notes,
  editNote,
  deleteNote,
} = require("../controller/noteController");
const authMiddleware = require("../middlewares/auth");

router.get("/", home);

router.get("/takenote", authMiddleware, takeNote);

router.post("/takenote", authMiddleware, takeNote);

router.get("/edit/:id", authMiddleware, editNote);

router.post("/edit/:id", authMiddleware, editNote);

router.get("/mynotes", authMiddleware, notes);

router.post("/delete/:id", authMiddleware, deleteNote);

module.exports = router;
