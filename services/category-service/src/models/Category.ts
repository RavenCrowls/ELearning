import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  CATEGORY_ID: string;
  NAME: string;
  STATUS: boolean;
}

const categorySchema: Schema = new Schema({
  CATEGORY_ID: {
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

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;