const {
  userModel,
  registerValidator,
  loginValidator,
} = require("../model/user");

exports.login = async (req, res) => {
  const body = req.body;
  const { error } = loginValidator(body);
  console.log(body);

  if (req.method === "POST" && !error) {
    return res.send("we got here");
  }

  return res.status(200).render("./auth/Login", {
    title: "Simpnotes | Sign In",
    date: new Date().toLocaleTimeString(),
    path: "login",
    validationError: error && req.method === "POST" ? error.details[0].message : "",
    body: body ? body : ''
  });
};

exports.register = async (req, res) => {
  const body = req.body;
  const { error } = registerValidator(body);
  if (req.method === "POST" && !error) {
    return res.send("hello");
  }
  console.log(error);
  return res.status(200).render("./auth/register", {
    title: "Simpnotes | Register",
    validationError: error && req.method === "POST" ? error : '',
    path: "register",
  });
};
