const mongoose = require("mongoose");
const Joi = require("joi");
const noteSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
  },
  body: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  category: {
    type: String,
    required: true,
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

exports.noteModel = mongoose.model('Note', noteSchema);

exports.validator = (obj) => {
    const schema = Joi.object({
        subject: Joi.string().min(5).max(30).required(),
        body: Joi.string().min(5).max(100).required(),
        category: Joi.string().min(3).max(20).required()
    })
    return schema.validate(obj);
}

