import mongoose, { Document, Schema } from "mongoose";

export interface ICourse extends Document {
  COURSE_ID: string;
  TITLE: string;
  INSTRUCTOR_ID: string;
  CREATED_DATE: Date;
  CATEGORIES: string[];
  SUB_CATEGORIES: string[];
  RATING: [string, string];
  DESCRIPTION: string;
  OUTPUT: string[];
  PRICE: number;
  LEVEL: string;
  DURATION: string;
  NUMBER_OF_VIDEOS: number;
  ENROLLMENT_COUNT: number;
  APPROVAL_STATUS: string;
  STATUS: boolean;
  IMAGE_URL: string;
  AVERAGE_RATING?: number;
  TOTAL_RATINGS?: number;
}

const courseSchema: Schema = new Schema(
  {
    COURSE_ID: {
      type: String,
      required: true,
      unique: true,
    },
    TITLE: {
      type: String,
      required: true,
    },
    INSTRUCTOR_ID: {
      type: String,
      required: true,
    },
    CREATED_DATE: {
      type: Date,
      default: Date.now(),
    },
    CATEGORIES: {
      type: [String],
      required: true,
      default: [],
    },
    SUB_CATEGORIES: {
      type: [String],
      required: true,
      default: [],
    },
    RATING: {
      type: [String],
      default: ["0", "0"],
    },
    DESCRIPTION: {
      type: String,
      required: true,
    },
    OUTPUT: {
      type: [String],
      required: true,
      default: [],
    },
    PRICE: {
      type: Number,
      required: true,
    },
    LEVEL: {
      type: String,
      required: true,
    },
    DURATION: {
      type: String,
      required: true,
    },
    NUMBER_OF_VIDEOS: {
      type: Number,
      required: true,
      default: 0,
    },
    ENROLLMENT_COUNT: {
      type: Number,
      required: true,
      default: 0,
    },
    APPROVAL_STATUS: {
      type: String,
      required: true,
      enum: ["Pending", "Approved", "Rejected"],
    },
    STATUS: {
      type: Boolean,
      required: true,
      default: true,
    },
    IMAGE_URL: {
      type: String,
      required: false,
    },
    AVERAGE_RATING: {
      type: Number,
      default: 0,
    },
    TOTAL_RATINGS: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

const Course = mongoose.model<ICourse>("Course", courseSchema);

export default Course;
