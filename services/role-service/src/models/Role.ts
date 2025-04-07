import mongoose, { Document, Schema } from 'mongoose';

export interface IRole extends Document {
  ROLE_ID: string;
  NAME: string;
  STATUS: boolean;
}

const roleSchema: Schema = new Schema({
  ROLE_ID: {
    type: String,
    required: true,
    unique: true,
  },
  NAME: {
    type: String,
    required: true,
  },
  STATUS: {
    type: Boolean,
    default: true,
  },
}, { versionKey: false });

const Role = mongoose.model<IRole>('Role', roleSchema);

export default Role;