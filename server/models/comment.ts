import mongoose, { Schema, Document } from "mongoose";

interface Comment extends Document {
  content: string;
  authorName: string;
  post: mongoose.Schema.Types.ObjectId;
  commentDate: Date;
}

const commentSchema = new Schema<Comment>({
  content: { type: String, required: true },
  authorName: { type: String },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // Reference to the Post model
  commentDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model<Comment>("Post", commentSchema);
