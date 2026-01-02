import mongoose, { Document, Schema } from "mongoose";

export interface IVideo extends Document {
  LECTURE_ID: string;
  VIDEO_ID: string;
  TITLE: string;
  DURATION: string;
  URL: string;
  FREE_TRIAL: boolean;
  STATUS: boolean;
  ORDER: number;
}

const videoSchema: Schema = new Schema(
  {
    LECTURE_ID: {
      type: String,
      required: true,
    },
    VIDEO_ID: {
      type: String,
      required: true,
      unique: true,
    },
    TITLE: {
      type: String,
      required: true,
    },
    DURATION: {
      type: String,
      default: "0:00",
    },
    URL: {
      type: String,
      default: "",
    },
    FREE_TRIAL: {
      type: Boolean,
      default: false,
    },
    STATUS: {
      type: Boolean,
      default: true,
    },
    ORDER: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

const Video = mongoose.model<IVideo>("Video", videoSchema);

export default Video;
