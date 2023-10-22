import { Schema, Document, Model, model } from "mongoose";

export interface User extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema<User>({
  username: { type: String, unique: true },
  password: { type: String },
});

export default model<User>("User", userSchema);
