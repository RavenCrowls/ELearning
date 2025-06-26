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

            let existingCart = await Cart.findOne({
                USER_ID,
                PAYMENT_STATUS: 'pending',
                STATUS: true
            });
            if (existingCart) {
                const newItem = ITEMS && ITEMS[0];
                if (newItem) {
                    const alreadyInCart = existingCart.ITEMS.some((item: any) => item.COURSE_ID === newItem.COURSE_ID);
                    if (!alreadyInCart) {
                        existingCart.ITEMS.push(newItem);
                        existingCart.TOTAL_PRICE += newItem.PRICE;
                        await existingCart.save();
                    }
                }
                return res.status(200).json(existingCart);
            }

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
            const cart = await Cart.findOne({ USER_ID: userId, STATUS: 1, PAYMENT_STATUS: 'pending' });
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

    async removeItemFromCart(req: Request, res: Response) {
        try {
            const { userId, courseId } = req.params;
            const cart = await Cart.findOne({ USER_ID: userId, STATUS: 1 });
            if (!cart) {
                return res.status(404).json({ message: "Cart not found for this user" });
            }
            const initialLength = cart.ITEMS.length;
            cart.ITEMS = cart.ITEMS.filter((item: any) => item.COURSE_ID !== courseId);
            if (cart.ITEMS.length === initialLength) {
                return res.status(404).json({ message: "Item not found in cart" });
            }
            cart.TOTAL_PRICE = cart.ITEMS.reduce((sum: number, item: any) => sum + item.PRICE, 0);
            await cart.save();
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: "Error removing item from cart", error });
        }
    }

    async deleteUserCart(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const cart = await Cart.findOne({ USER_ID: userId, STATUS: 1 });
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found for this user' });
            }
            cart.STATUS = false;
            await cart.save();
            res.status(200).json({ message: 'Cart cleared successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error clearing cart', error });
        }
    }
}

export default CartController;