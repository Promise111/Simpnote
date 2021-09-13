const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("config");
const userSchema = new mongoose.Schema({
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  firstname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
    },
    config.get("jwtPrivateKey")
  );
};

exports.userModel = mongoose.model("User", userSchema);

exports.loginValidator = (obj) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(obj);
};

exports.registerValidator = (obj) => {
  const schema = Joi.object({
    lastname: Joi.string().required(),
    firstname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .required(),
    confirm_password: Joi.ref("password"),
  });
  return schema.validate(obj);
};

exports.hash = async (password) => {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");
    crypto.scrypt(password, salt, 32, (error, derivedKey) => {
      if (error) reject(error);
      resolve(salt + ":" + derivedKey.toString("hex"));
    });
  });
};

exports.verify = async (password, hash) => {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(":");
    crypto.scrypt(password, salt, 32, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(key == derivedKey.toString("hex"));
    });
  });
};

exports.verifyToken = (token) => {
  let decoded;
  try {
    decoded = jwt.verify(token, config.get("jwtPrivateKey"));
  } catch (ex) {
    decoded = ex.message;
  }
  return decoded;
};
