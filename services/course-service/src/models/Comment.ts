import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  COMMENT_ID: string;
  VIDEO_ID: string;
  USER_ID: string;
  CONTENT: string;
  PARENT_COMMENT_ID?: string; // For replies
  CREATED_AT: Date;
  UPDATED_AT: Date;
  STATUS: boolean;
}

const commentSchema: Schema = new Schema(
  {
    COMMENT_ID: {
      type: String,
      required: true,
      unique: true,
    },
    VIDEO_ID: {
      type: String,
      required: true,
    },
    USER_ID: {
      type: String,
      required: true,
    },
    CONTENT: {
      type: String,
      required: true,
    },
    PARENT_COMMENT_ID: {
      type: String,
      default: null,
    },
    CREATED_AT: {
      type: Date,
      default: Date.now,
    },
    UPDATED_AT: {
      type: Date,
      default: Date.now,
    },
    STATUS: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false }
);

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
