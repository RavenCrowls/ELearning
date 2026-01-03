import mongoose, { Document, Schema } from "mongoose";

export interface IEnrollment extends Document {
  ENROLLMENT_ID: string;
  COURSE_ID: string;
  USER_ID: string;
  PROGRESS: number;
  STATUS: boolean;
  WATCHED: string[];
}

const enrollmentSchema: Schema = new Schema(
  {
    ENROLLMENT_ID: {
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
    PROGRESS: {
      type: Number,
      default: 0,
    },
    STATUS: {
      type: Boolean,
      default: true,
    },
    WATCHED: {
      type: [String],
      default: [],
    },
  },
  { versionKey: false }
);

// Add indexes for better query performance
enrollmentSchema.index({ USER_ID: 1, STATUS: 1 }); // For user enrollments
enrollmentSchema.index({ COURSE_ID: 1, STATUS: 1 }); // For course enrollments
enrollmentSchema.index({ USER_ID: 1, COURSE_ID: 1 }, { unique: true }); // Prevent duplicate enrollments

const Enrollment = mongoose.model<IEnrollment>("Enrollment", enrollmentSchema);

export default Enrollment;
