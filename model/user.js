const mongoose = require("mongoose");
const Joi = require("joi");
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
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
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
    confirm_password: Joi.ref('password'),
  });
  return schema.validate(obj);
};
