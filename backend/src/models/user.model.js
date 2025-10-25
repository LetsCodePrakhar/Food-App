const mongoose = require("mongoose");

// 💡 FIX: Change new mongoose.SchemaType to new mongoose.Schema
const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: false },
  email: { type: String, require: true, unique: true },
  password: { type: String }
},
{
    timestamps: true
}); // Added a semicolon here for good practice

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;