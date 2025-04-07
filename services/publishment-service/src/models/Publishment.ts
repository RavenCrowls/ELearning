import mongoose, { Document, Schema } from 'mongoose';

export interface IPublishment extends Document {
  PUBLISHMENT_ID: string;
  COURSE_ID: string;
  USER_ID: string;
  STATUS: boolean;
}

const publishmentSchema: Schema = new Schema({
  PUBLISHMENT_ID: {
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
  STATUS: {
    type: Boolean,
    default: true,
  },
}, { versionKey: false });

const Publishment = mongoose.model<IPublishment>('Publishment', publishmentSchema);

export default Publishment;