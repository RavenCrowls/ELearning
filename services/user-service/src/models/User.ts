import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  USER_ID: string;
  ROLE_ID: string;
  NAME: string;
  EMAIL: string;
  AVATAR: string;
  BIO: string;
  JOIN_DATE: Date;
  STATUS: boolean;
}

const userSchema: Schema = new Schema({
  USER_ID: {
    type: String,
    required: true,
    unique: true,
  },
  ROLE_ID: {
    type: String,
    required: true,
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

const User = mongoose.model<IUser>('User', userSchema);

export default User;