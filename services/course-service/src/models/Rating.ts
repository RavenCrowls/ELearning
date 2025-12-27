import mongoose, { Document, Schema } from "mongoose";

export interface IRating extends Document {
  RATING_ID: string;
  COURSE_ID: string;
  USER_ID: string;
  RATING: number; // 1-5
  COMMENT: string;
  CREATED_AT: Date;
  UPDATED_AT: Date;
  STATUS: boolean;
}

const ratingSchema: Schema = new Schema(
  {
    RATING_ID: {
      type: String,
      required: true,
      unique: true,
    },
    COURSE_ID: {
      type: String,
      required: true,
    },
    USER_ID: {
      type: String,
      required: true,
    },
    RATING: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    COMMENT: {
      type: String,
      default: "",
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

const Rating = mongoose.model<IRating>("Rating", ratingSchema);

export default Rating;
