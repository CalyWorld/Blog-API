import mongoose, { Document, Schema } from "mongoose";

interface User extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema<User>({
  username: { type: String, unique: true },
  password: { type: String },
});

export const userModel = mongoose.model<User>("User", userSchema);
export default userModel;
