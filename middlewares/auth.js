const { verifyToken } = require("../model/user");

module.exports = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.redirect("/login");
    req.user = verifyToken(token);
    next();
}