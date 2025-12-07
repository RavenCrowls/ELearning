"use client"
import React from 'react'
import { useSoldCourses } from '@/app/hooks/useSoldCourses';

const Soldcourses = () => {
  const { cartItems, formatPrice, totalPrice, isLoading, handlePayment } = useSoldCourses();
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
