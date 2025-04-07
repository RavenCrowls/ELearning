import mongoose, { Document, Schema } from 'mongoose';

export interface ILecture extends Document {
  LECTURE_ID: string;
  TITLE: string;
  DURATION: string;
  APPROVAL_STATUS: string;
  URL: string;
  STATUS: boolean;
}

export interface ICourse extends Document {
  COURSE_ID: string;
  TITLE: string;
  DESCRIPTION: string;
  CATEGORY_ID: string;
  CREATED_DATE: Date;
  PRICE: number;
  STATUS: boolean;
  APPROVAL_STATUS: string;
  LECTURES: ILecture[];
}

const lectureSchema: Schema = new Schema(
  {
    LECTURE_ID: {
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
      required: true,
    },
    APPROVAL_STATUS: {
      type: String,
      required: true,
      enum: ["Pending", "Approved", "Rejected"],
    },
    STATUS: {
      type: Boolean,
      default: true,
    }
  },
  { versionKey: false }
);

const courseSchema: Schema = new Schema(
  {
    COURSE_ID: {
      type: Number,
      required: true,
      unique: true,
    },
    TITLE: {
      type: String,
      required: true,
    },
    DESCRIPTION: {
      type: String,
      required: true,
    },
    CATEGORY_ID: {
      type: String,
      required: true,
    },
    CREATED_DATE: {
      type: Date,
      default: Date.now(),
    },
    PRICE: {
      type: Number,
      required: true,
    },
    STATUS: {
      type: Boolean,
      default: true,
    },
    APPROVAL_STATUS: {
      type: String,
      required: true,
      enum: ["Pending", "Approved", "Rejected"],
    },
    LECTURES: {
      type: [lectureSchema],
      default: [],
    },
  },
  { versionKey: false }
);

const Course = mongoose.model<ICourse>('Course', courseSchema);

export default Course;