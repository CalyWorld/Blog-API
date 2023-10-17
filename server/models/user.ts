import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model<User>("User", userSchema);
