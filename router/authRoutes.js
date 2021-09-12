const express = require("express");
const router = express.Router();
const { login, register } = require("../controller/authController");

router.get("/login", login);

router.post("/login", login)

router.get("/register", register);

router.post("/register", register)

module.exports = router;
