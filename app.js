const config = require("config");
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const noteRoutes = require("./router/noteRoutes");
const authRoutes = require("./router/authRoutes");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/simpnotes")
  .then(() => console.log("Connnected to database..."))
  .catch((err) => console.log(err.message));

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/Simpnotes", noteRoutes);
app.use("/Simpnotes", authRoutes);

app.listen(port, () => console.log(`Listening on port: ${port}`));
