import mongoose, { Schema, model, Document } from "mongoose";

interface Comment extends Document {
  content: string;
  authorName: string;
  post: mongoose.Schema.Types.ObjectId;
  commentDate: Date;
}

const CommentSchema = new Schema<Comment>({
  content: { type: String, required: true },
  authorName: { type: String },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // Reference to the Post model
  commentDate: { type: Date, default: Date.now },
});

CommentSchema.virtual("url").get(function () {
  return `/comment/${this._id}`;
});

const Comment = model<Comment>("Post", CommentSchema);
export default Comment;
