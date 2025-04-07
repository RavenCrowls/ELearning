import { Router } from 'express';
import CategoryController from '../controllers/categoryController';

const router = Router();
const categoryController = new CategoryController();

const {
    createCategory,
    getAllCategories,
    getCategory,
    deleteCategory,
    updateCategory
} = categoryController;

router.post("/", createCategory.bind(categoryController));
router.get("/", getAllCategories.bind(categoryController));
router.get("/:categoryId", getCategory.bind(categoryController));
router.delete("/:categoryId", deleteCategory.bind(categoryController));
router.put("/:categoryId", updateCategory.bind(categoryController));

export { router as categoryRouter };