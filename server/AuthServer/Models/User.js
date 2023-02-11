const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, strip: true },
  email: { type: String, unique: true, strip: true },
  password: { type: String },
  chips: { type: Number },
});

module.exports = mongoose.model("user", userSchema);
