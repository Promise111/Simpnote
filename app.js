const config = require("config");
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const helmet = require("helmet");
const noteRoutes = require("./router/noteRoutes");
const authRoutes = require("./router/authRoutes");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
// mongoose
//   .connect("mongodb://127.0.0.1:27017/simpnotes")
//   .then(() => console.log("Connnected to database..."))
//   .catch((err) => console.log(err.message));

mongoose
  .connect(`mongodb+srv://Promise:${process.env.atlasPassword}@cluster0.sx5qn.mongodb.net/simpnotes`)
  .then(() => console.log("Connnected to database..."))
  .catch((err) => console.log(err.message, "database connection failed"));

app.use(helmet());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", noteRoutes);
app.use("/", authRoutes);

app.use("", (req, res) => {
  return res.status(404).render("./404/404", {
    title: "404 | Page Not Found",
    user: "",
    path: "404",
  });
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
