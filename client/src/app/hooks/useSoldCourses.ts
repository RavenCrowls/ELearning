'use client';

import { useUser } from '@clerk/nextjs';
import React from 'react';
import { fetchCart } from '@/app/services/cartService';
import { createCartPayment } from '@/app/services/paymentService';

interface CartItem {
  id: number;
  name: string;
  price: number;
}

export function useSoldCourses() {
  const { user } = useUser();
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [cartData, setCartData] = React.useState<any | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const data = await fetchCart(user.id);
        if (data && Array.isArray(data.ITEMS)) {
          const items = data.ITEMS.map((item: any) => ({
            id: Number(item.COURSE_ID),
            name: item.TITLE,
            price: item.PRICE,
          }));
          setCartItems(items);
          setCartData(data);
        }
      } catch (err) {
        // silent
      }
    };
    load();
  }, [user]);

  const formatPrice = (price: number) => price.toLocaleString('vi-VN') + ' đ';
  const totalPrice = cartData?.TOTAL_PRICE || cartItems.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = async () => {
    if (!cartData || cartItems.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }
    setIsLoading(true);
    try {
      const data = await createCartPayment({ CartID: cartData.CART_ID, totalPrice });
      if (data?.paymentUrl) {
        window.open(data.paymentUrl, '_blank');
      } else {
        alert('Không thể tạo link thanh toán');
      }
    } catch {
      alert('Có lỗi xảy ra khi tạo thanh toán');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cartItems,
    formatPrice,
    totalPrice,
    isLoading,
    handlePayment,
  };
}