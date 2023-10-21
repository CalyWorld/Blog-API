import { Document, Model, Schema, model } from "mongoose";

export interface User extends Document {
  username: string;
  password: string;
}

export const userSchema: Schema<User> = new Schema<User>({
  username: { type: String, unique: true },
  password: { type: String },
});

export const UserModel: Model<User> = model<User>("User", userSchema);
export default UserModel;
