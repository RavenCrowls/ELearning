import mongoose, { Document, Schema } from "mongoose";

export interface ISubCategory {
  SUB_CATEGORY_ID: string;
  NAME: string;
  STATUS: number;
}

export interface ICategory extends Document {
  CATEGORY_ID: string;
  NAME: string;
  STATUS: boolean;
  SUB_CATEGORIES: ISubCategory[];
}

const subCategorySchema: Schema = new Schema(
  {
    SUB_CATEGORY_ID: {
      type: String,
      required: true,
    },
    NAME: {
      type: String,
      required: true,
    },
    STATUS: {
      type: Boolean,
      default: 1,
    },
  },
  { _id: false }
);

const categorySchema: Schema = new Schema(
  {
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
    SUB_CATEGORIES: [subCategorySchema],
  },
  { versionKey: false }
);

// Add indexes for better query performance
categorySchema.index({ STATUS: 1 });
categorySchema.index({ CATEGORY_ID: 1, STATUS: 1 });

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
