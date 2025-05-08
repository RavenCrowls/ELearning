import mongoose, { Document, Schema } from 'mongoose';

interface CartItem {
    COURSE_ID: string;
    TITLE: string;
    PRICE: number;
}

export interface ICart extends Document {
    CART_ID: string;
    USER_ID: string;
    ITEMS: CartItem[];
    TOTAL_PRICE: number;
    STATUS: boolean;
    PAYMENT_STATUS: string;
}

const cartSchema: Schema = new Schema({
    CART_ID: {
        type: String,
        required: true,
        unique: true,
    },
    USER_ID: {
        type: String,
        required: true,
    },
    ITEMS: [{
        COURSE_ID: {
            type: String,
            required: true,
        },
        TITLE: {
            type: String,
            required: true,
        },
        PRICE: {
            type: Number,
            required: true,
        }
    }],
    TOTAL_PRICE: {
        type: Number,
        required: true,
    },
    STATUS: {
        type: Boolean,
        default: true,
    },
    PAYMENT_STATUS: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending',
    }
}, { versionKey: false });

const Cart = mongoose.model<ICart>('Cart', cartSchema);

export default Cart; 