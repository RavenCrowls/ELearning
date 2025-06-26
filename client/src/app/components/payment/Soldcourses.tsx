"use client"
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'

interface CartItem {
  id: number;
  name: string;
  price: number;
}

interface CartData {
  _id: string;
  CART_ID: string;
  USER_ID: string;
  ITEMS: CartItem[];
  TOTAL_PRICE: number;
  STATUS: boolean;
  PAYMENT_STATUS: string;
}

const Soldcourses = () => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchCart = async () => {
      try {
        const res = await fetch(`http://localhost:5008/api/carts/user/${user.id}`);
        if (!res.ok) throw new Error('Failed to fetch cart');
        const data = await res.json();
        if (data && Array.isArray(data.ITEMS)) {
          const items = data.ITEMS.map((item: any) => ({
            id: Number(item.COURSE_ID),
            name: item.TITLE,
            price: item.PRICE,
          }));
          setCartItems(items);
          setCartData(data); // Store the full cart data
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, [user]);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' đ';
  };

  const handlePayment = async () => {
    if (!cartData || cartItems.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5009/api/payment/create-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CartID: cartData.CART_ID,
          totalPrice: cartData.TOTAL_PRICE
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment');
      }

      const data = await response.json();

      // Open the payment link in a new tab
      if (data.paymentUrl) {
        window.open(data.paymentUrl, '_blank');
      } else {
        alert('Không thể tạo link thanh toán');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Có lỗi xảy ra khi tạo thanh toán');
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = cartData?.TOTAL_PRICE || cartItems.reduce((sum, item) => sum + item.price, 0);
  return (
    <div className='bg-white w-full max-w-xl lg:max-w-2xl border-gray-700 p-4 rounded-lg shadow-sm mb-6 mt-6'>
      <h1 className="text-xl font-semibold text-gray-800 mb-6">Khóa học</h1>

      {/* Table Header */}
      <div className="flex justify-between items-center pb-3 border-b border-gray-200 mb-4">
        <span className="text-gray-600 font-medium">Khóa học</span>
        <span className="text-gray-600 font-medium">Giá tiền</span>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
          >
            <span className="text-gray-800">{item.name}</span>
            <span className="text-gray-800 font-medium">{formatPrice(item.price)}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center pt-4 mt-6 border-t border-gray-200">
        <span className="text-lg font-semibold text-gray-800">Tổng tiền</span>
        <span className="text-lg font-semibold text-gray-800">{formatPrice(totalPrice)}</span>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handlePayment}
        disabled={isLoading || cartItems.length === 0}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg mt-6 transition-colors duration-200"
      >
        {isLoading ? 'Đang xử lý...' : 'Thanh toán'}
      </button>
    </div>
  )
}

export default Soldcourses
