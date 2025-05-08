import { Request, Response } from 'express';
import Category, { ICategory } from '../models/Category';

class CategoryController {
    async createCategory(req: Request, res: Response) {
        try {
            const {
                CATEGORY_ID,
                NAME,
                STATUS,
                SUB_CATEGORIES
            } = req.body;
            const newCategory = new Category({
                CATEGORY_ID,
                NAME,
                STATUS,
                SUB_CATEGORIES
            });
            await newCategory.save();
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(500).json({ message: "Error creating category", error });
        }
    }

    async getAllCategories(req: Request, res: Response) {
        try {
            const categoryList = await Category.find({ STATUS: 1 });
            res.status(200).json(categoryList);
        } catch (error) {
            res.status(500).json({ message: "Error getting categories", error });
        }
    }

    async getCategory(req: Request, res: Response) {
        try {
            const { categoryId } = req.params;
            const category = await Category.findOne({ CATEGORY_ID: categoryId, STATUS: 1 });
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ message: "Error getting category", error });
        }
    }

    async updateCategory(req: Request, res: Response) {
        try {
            const { categoryId } = req.params;
            const {
                NAME,
                SUB_CATEGORIES
            } = req.body;
            const data = {
                NAME,
                SUB_CATEGORIES
            };
            const updatedCategory = await Category.findOneAndUpdate(
                { CATEGORY_ID: categoryId, STATUS: 1 },
                data,
                { new: true }
            );
            if (!updatedCategory) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(500).json({ message: "Error updating category", error });
        }
    }

    async deleteCategory(req: Request, res: Response) {
        try {
            const { categoryId } = req.params;
            const deletedCategory = await Category.findOne({ CATEGORY_ID: categoryId, STATUS: 1 });
            if (!deletedCategory) {
                return res.status(404).json({ message: "Category not found" });
            }
            deletedCategory.STATUS = false;
            await deletedCategory.save();
            res.status(200).json(deletedCategory);
        } catch (error) {
            res.status(500).json({ message: "Error deleting category", error });
        }
    }
}

export default CategoryController;