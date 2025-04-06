import mongoose, { Document, Schema } from 'mongoose';

interface IEnrollment {
  COURSE_ID: string;
  PROGRESS: number;
}

export interface IStudent extends Document {
  STUDENT_ID: string;
  NAME: string;
  EMAIL: string;
  AVATAR: string;
  BIO: string;
  JOIN_DATE: Date;
  STATUS: boolean;
  ENROLLMENTS: IEnrollment[];
}

const studentSchema: Schema = new Schema({
  STUDENT_ID: {
    type: String,
    required: true,
    unique: true,
  },
  NAME: {
    type: String,
    required: true,
  },
  EMAIL: {
    type: String,
    required: true,
    unique: true,
  },
  AVATAR: {
    type: String,
    default: null,
  },
  BIO: {
    type: String,
    default: null,
  },
  JOIN_DATE: {
    type: Date,
    default: Date.now,
  },
  STATUS: {
    type: Boolean,
    default: true,
  },
  ENROLLMENTS: {
    type: [{
      COURSE_ID: { type: String, required: true },
      PROGRESS: { type: Number, required: true, min: 0, max: 100 },
    }],
    default: [],
  },
}, { versionKey: false });

const Student = mongoose.model<IStudent>('Student', studentSchema);

export default Student;