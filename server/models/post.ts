import mongoose, { Schema, Document, model } from "mongoose";

interface IPost extends Document {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  publishedDate: Date;
  isPublished: boolean;
  imageUrl: string;
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
  publishedDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: false },
  imageUrl: { type: String },
});

PostSchema.virtual("url").get(function () {
  return `/post/${this._id}`;
});

const Post = model<IPost>("Post", PostSchema);
export default Post;
