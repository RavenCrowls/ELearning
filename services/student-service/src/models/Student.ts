import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent extends Document {
  STUDENT_ID: string;
  NAME: string;
  EMAIL: string;
  AVATAR: string;
  BIO: string;
  JOIN_DATE: Date;
  STATUS: boolean;
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
}, { versionKey: false });

const Student = mongoose.model<IStudent>('Student', studentSchema);

export default Student;