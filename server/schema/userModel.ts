const mongoose = require("mongoose");
interface User extends Document {
  username: string;
  email?: string;
  password: string;
  confirmPassword?: string;
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    confirmPassword: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("AuthUserDetails", UserSchema);

export {};
