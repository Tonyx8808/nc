const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  pass: {
    type: String, // hash bcrypt, mai la password in chiaro
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Admin", AdminSchema);
