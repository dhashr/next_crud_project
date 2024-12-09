import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    phone_no: Number,
  },
  { timestamps: true }
);

const Users =
  mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;
