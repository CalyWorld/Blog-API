import mongoose, { Schema, Document } from "mongoose";

interface Post extends Document {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  publishedDate: Date;
  isPublished: boolean;
  imageUrl: string;
}

const postSchema = new Schema<Post>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
  publishedDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: false },
  imageUrl: { type: String },
});

const postModel = mongoose.model<Post>("Post", postSchema);
export default postModel;
