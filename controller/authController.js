const {
  userModel,
  registerValidator,
  loginValidator,
  hash,
  verify,
} = require("../model/user");
const _ = require("../utils/loadash");

exports.login = async (req, res) => {
  const body = req.body;
  const { error } = loginValidator(body);
  let accessError;

  if (req.method === "POST" && !error) {
    const user = await userModel.findOne({ email: body.email });
    if (!user) accessError = "Invalid Email and Password";
    if (user) {
      const isPasswordValid = await verify(body.password, user.password);
      if (!isPasswordValid) accessError = "Invalid Email and Password";
      if (user && isPasswordValid) {
        const token = user.generateAuthToken();
        res.cookie("jwt", token, { secure: false, httpOnly: true });
        return res.redirect("/mynotes");
      }
    }
  }

  return res.status(200).render("./auth/login", {
    title: "Simpnotes | Sign In",
    date: new Date().toLocaleTimeString(),
    path: "login",
    validationError:
      error && req.method === "POST" ? error.details[0].message : "",
    accessError: accessError ? accessError : "",
    body: body ? body : "",
    user: "",
  });
};

exports.register = async (req, res) => {
  let body = req.body;
  const { error } = registerValidator(body);
  let accessError;
  if (req.method === "POST" && !error) {
    let user = await userModel.findOne({ email: body.email });
    if (user) accessError = "User already Exists";
    if (!user) {
      user = new userModel(
        _.pick(body, ["firstname", "lastname", "email", "password"])
      );
      user.password = await hash(body.password);
      await user.save();
      const token = user.generateAuthToken();
      res.cookie("jwt", token, { secure: false, httpOnly: true });
      return res.redirect("/mynotes");
    }
  }
  return res.status(200).render("./auth/register", {
    title: "Simpnotes | Register",
    validationError: error && req.method === "POST" ? error : "",
    accessError: accessError ? accessError : "",
    path: "register",
    body: body ? body : "",
    user: "",
  });
};

exports.logout = async(req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/login");
}
