const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamp: true,
  },
);

// hash password before saving

// using async/await style; do not declare or call `next` since mongoose
// won't pass it when the function returns a promise.  just return or
// throw and mongoose handles the flow for us.
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return; // nothing to do
  }
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
