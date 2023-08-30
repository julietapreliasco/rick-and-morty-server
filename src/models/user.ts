import { Schema, model } from "mongoose";
import { User } from "../types/interfaces";

const UserSchema = new Schema<User>({
  firebaseUid: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default model<User>("UserModel", UserSchema);
