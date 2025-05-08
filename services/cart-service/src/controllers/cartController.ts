import { Request, Response } from 'express';
import Cart, { ICart } from '../models/Cart';

class CartController {
    async createCart(req: Request, res: Response) {
        try {
            const {
                CART_ID,
                USER_ID,
                ITEMS,
                TOTAL_PRICE,
                PAYMENT_STATUS
            } = req.body;
            const newCart = new Cart({
                CART_ID,
                USER_ID,
                ITEMS,
                TOTAL_PRICE,
                PAYMENT_STATUS
            });
            await newCart.save();
            res.status(201).json(newCart);
        } catch (error) {
            res.status(500).json({ message: "Error creating cart", error });
        }
    }

    async getAllCarts(req: Request, res: Response) {
        try {
            const cartList = await Cart.find({ STATUS: 1 });
            res.status(200).json(cartList);
        } catch (error) {
            res.status(500).json({ message: "Error getting carts", error });
        }
    }

    async getCart(req: Request, res: Response) {
        try {
            const { cartId } = req.params;
            const cart = await Cart.findOne({ CART_ID: cartId, STATUS: 1 });
            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: "Error getting cart", error });
        }
    }

    async getUserCart(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const cart = await Cart.findOne({ USER_ID: userId, STATUS: 1 });
            if (!cart) {
                return res.status(404).json({ message: "Cart not found for this user" });
            }
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: "Error getting user cart", error });
        }
    }

    async updateCart(req: Request, res: Response) {
        try {
            const { cartId } = req.params;
            const {
                ITEMS,
                TOTAL_PRICE,
                PAYMENT_STATUS
            } = req.body;
            const data = {
                ITEMS,
                TOTAL_PRICE,
                PAYMENT_STATUS
            };
            const updatedCart = await Cart.findOneAndUpdate(
                { CART_ID: cartId, STATUS: 1 },
                data,
                { new: true }
            );
            if (!updatedCart) {
                return res.status(404).json({ message: "Cart not found" });
            }
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json({ message: "Error updating cart", error });
        }
    }

    async deleteCart(req: Request, res: Response) {
        try {
            const { cartId } = req.params;
            const deletedCart = await Cart.findOne({ CART_ID: cartId, STATUS: 1 });
            if (!deletedCart) {
                return res.status(404).json({ message: "Cart not found" });
            }
            deletedCart.STATUS = false;
            await deletedCart.save();
            res.status(200).json(deletedCart);
        } catch (error) {
            res.status(500).json({ message: "Error deleting cart", error });
        }
    }
}

export default CartController; 