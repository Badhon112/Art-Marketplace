import { Schema, model, models } from "mongoose";
const UserSchema = new Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
    require: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    require: [true, "Email is required"],
  },
  password: {
    type: String,
    require: [true, "Password is required"],
  },
  profileImagePath: {
    type: String,
    require: [true, "Profile image is required"],
  },
  wishlist: {
    type: Array,
    default: [],
  },
  cart: {
    type: Array,
    default: [],
  },
  order: {
    type: Array,
    default: [],
  },
  work: {
    type: Array,
    default: [],
  },
});
const User = models.User || model("User", UserSchema);

export default User;
