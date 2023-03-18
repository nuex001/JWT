const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// USER SCHEMA

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Please enter Username"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter email"],
    },
    password: {
      type: String,
      unique: true,
      required: [true, "Please enter password"],
      minlength: [6, "minimum password length is 6 characters"],
    },
  },
  { timestamps: true }
);

// Hashing password
userSchema.pre("save", async function (next) {
  console.log(this.password);
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

//model
const User = mongoose.model("user", userSchema);

module.exports = { User }
