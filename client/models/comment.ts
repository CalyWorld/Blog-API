import mongoose, { Schema, model, Document } from "mongoose";

interface Comment extends Document {
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  post: mongoose.Schema.Types.ObjectId;
  commentDate: Date;
}

const CommentSchema = new Schema<Comment>({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // Reference to the Post model
  commentDate: { type: Date, default: Date.now },
});

CommentSchema.virtual("url").get(function () {
  return `/comments/${this._id}`;
});

const Comment = model<Comment>("Comment", CommentSchema);
export default Comment;
