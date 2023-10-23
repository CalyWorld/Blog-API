import { Schema, model, Document } from "mongoose";

export interface User extends Document {
  username: string;
  password: string;
}

const UserSchema = new Schema<User>({
  username: { type: String, unique: true },
  password: { type: String },
});

UserSchema.virtual("url").get(function () {
  return `/${this._id}`;
});

const User = model<User>("User", UserSchema);
export default User;
