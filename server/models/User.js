const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  status: { type: String, default: "active" },
  joinDate: { type: Date, default: Date.now },
  history: {
    wishlist: [String],
    orders: [String],
    cart: [String],
    logins: [Date]
  }
});

module.exports = mongoose.model("User", userSchema);
