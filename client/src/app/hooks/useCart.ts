'use client'

import { useEffect, useMemo, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { clearCartApi, fetchCart, removeCartItem } from '../services/cartService';
import { fetchCourse } from '../services/courseService';

export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

export function useCart(initialItems: CartItem[] = []) {
    const { user } = useUser();
    const [cartItems, setCartItems] = useState<CartItem[]>(initialItems.length > 0 ? initialItems : []);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!user) return;
        let cancelled = false;
        const load = async () => {
            setLoading(true);
            try {
                const data = await fetchCart(user.id);
                if (!data || !Array.isArray(data.ITEMS)) return;
                const itemsWithImages = await Promise.all(
                    data.ITEMS.map(async (item: any) => {
                        let imageUrl = '/course1.jpg';
                        try {
                            const courseData = await fetchCourse(Number(item.COURSE_ID));
                            if (courseData?.IMAGE_URL) {
                                imageUrl = courseData.IMAGE_URL;
                            }
                        } catch {}
                        return {
                            id: Number(item.COURSE_ID),
                            title: item.TITLE,
                            price: item.PRICE,
                            image: imageUrl,
                            quantity: 1,
                        } as CartItem;
                    })
                );
                if (!cancelled) setCartItems(itemsWithImages);
            } catch (err) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(err);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => {
            cancelled = true;
        };
    }, [user]);

    const totalAmount = useMemo(
        () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
        [cartItems]
    );

    const totalItems = cartItems.length;

    const remove = async (id: number) => {
        if (!user) return;
        await removeCartItem(user.id, id);
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const clear = async () => {
        if (!user) return;
        await clearCartApi(user.id);
        setCartItems([]);
    };

    return {
        cartItems,
        totalAmount,
        totalItems,
        loading,
        removeItem: remove,
        clear,
    };
}