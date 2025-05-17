import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please provider a userName"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provider a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgetPasswordToken: String,
  forgetPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.model("users", userSchema);
// const User = mongoose.models.user || mongoose.model("users", userSchema);
export default User;
