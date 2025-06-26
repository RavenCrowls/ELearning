import { Router } from 'express';
import CartController from '../controllers/cartController';

const router = Router();
const cartController = new CartController();

const {
    createCart,
    getAllCarts,
    getCart,
    getUserCart,
    deleteCart,
    updateCart
} = cartController;

router.post("/", createCart.bind(cartController));
router.get("/", getAllCarts.bind(cartController));
router.delete("/user/:userId/item/:courseId", cartController.removeItemFromCart.bind(cartController));
router.get("/user/:userId", getUserCart.bind(cartController));
router.delete("/user/:userId", cartController.deleteUserCart.bind(cartController));
router.get("/:cartId", getCart.bind(cartController));
router.delete("/:cartId", deleteCart.bind(cartController));
router.put("/:cartId", updateCart.bind(cartController));

export { router as cartRouter };