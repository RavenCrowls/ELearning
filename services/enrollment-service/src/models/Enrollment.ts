import mongoose, { Document, Schema } from 'mongoose';

export interface IEnrollment extends Document {
  ENROLLMENT_ID: string;
  COURSE_ID: string;
  USER_ID: string;
  PROGRESS: number;
  STATUS: boolean;
  WATCHED: string[];
}

const enrollmentSchema: Schema = new Schema({
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
}, { versionKey: false });

const Enrollment = mongoose.model<IEnrollment>('Enrollment', enrollmentSchema);

export default Enrollment;