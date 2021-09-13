const express = require("express");
const router = express.Router();
const { login, register, logout } = require("../controller/authController");

router.get("/login", login);

router.post("/login", login)

router.get("/register", register);

router.post("/register", register)

router.post("/logout", logout);

module.exports = router;
